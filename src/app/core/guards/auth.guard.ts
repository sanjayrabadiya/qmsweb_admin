import { Injectable } from '@angular/core';
import { Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private storageService: StorageService, private router: Router) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication('');
  }

  private checkAuthentication(url: string): boolean {
    if (this.storageService.HasToken) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
