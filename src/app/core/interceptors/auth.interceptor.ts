import { StorageService } from 'src/app/core/services/storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, take, filter, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private localDateTime = this.getTimeZone();
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'assets/base-settings.json') {
      return next.handle(req);
    }

    const clonedReq = this.addToken(req, this.storage.Token);

    return <any>next.handle(clonedReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    const headerSettings: { [name: string]: string | string[] } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = 'Bearer ' + token;
    }
    headerSettings['Content-Type'] = 'application/json';

    const auditReasonId = this.storage.GetAuditReasonId;
    if (auditReasonId && auditReasonId !== 'undefined') {
      headerSettings['audit-reason-id'] = auditReasonId;
    }

    const auditReasonOth = this.storage.GetAuditReasonOth;
    if (auditReasonOth && auditReasonOth !== 'undefined') {
      headerSettings['audit-reason-oth'] = auditReasonOth;
    }
    headerSettings['timeZone'] = this.getTimeZone();
    headerSettings['clientTimeZone'] = this.localDateTime;
    headerSettings['clientDateTime'] =new Date().toISOString();
    const newHeader = new HttpHeaders(headerSettings);
    const baseUrl = this.storage.BaseUrl;
    const customUrl = baseUrl ? baseUrl : '';

    const changedRequest = request.clone({
      url: customUrl + request.url,
      headers: newHeader
    });

    return changedRequest;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap((token: any) => {
          if (token) {
            this.storage.setToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);
            return next.handle(this.addToken(request, token.accessToken));
          }
          this.resetAndGoToLogin();
          return throwError('Error while refreshing token.');
        }),
        catchError((error) => {
          this.resetAndGoToLogin();
          return throwError(error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }

  refreshToken() {
   

    let refreshObject: any = {};
    refreshObject.refreshToken = this.storage.RefreshToken;
    refreshObject.accessToken = this.storage.Token;
    refreshObject.expiredAfter = null;

    return this.http.post<any>(`login/Refresh`, refreshObject).pipe(
      tap((resp: any) => {
        if (resp) {
          localStorage.setItem('bearerToken', resp.accessToken);
          localStorage.setItem('refreshToken', resp.refreshToken);
        }
      })
    );
  }

  resetAndGoToLogin() {
    this.storage.clear();
    this.router.navigate(['/auth']);
  }

  getTimeZone(): string {
    return /\((.*)\)/.exec(new Date().toString())[1];
  }
}
