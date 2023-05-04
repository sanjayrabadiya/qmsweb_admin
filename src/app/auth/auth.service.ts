import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../core/services/data.service';

@Injectable()
export class AuthService {
  constructor(private dataService: DataService) {}

  login(data: any): Observable<any> {
    return this.dataService.post('login', data);
  }

  logOut(userId: number, loginReportId: number): Observable<any> {
    return this.dataService.get<any>(`login/logout/${userId}/${loginReportId}`);
  }

  validateUserName(userName: string): Observable<string> {
    return this.dataService.post<string>(`UserOtp/InsertOtp/${userName}`, null);
  }

  validateOtp(otpInfo: any): Observable<string> {
    return this.dataService.post<string>(`UserOtp/VerifyOtp`, otpInfo);
  }

  changePasswordByOtp(changePasswordInfo: any): Observable<string> {
    return this.dataService.post<string>(`UserOtp/ChangePasswordByOtp`, changePasswordInfo);
  }

  logOutFromEveryWhere(userName: string): Observable<void> {
    return this.dataService.get<void>(`login/logOutFromEveryWhere/${userName}`);
  }
}
