import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  constructor(private data: DataService) { } 

  userNameValidate(userName: string): Observable<string> {
    return this.data.post<string>(`UserOtp/InsertOtp/${userName}`, null);
  }

  changePassword(entity: any): Observable<void> {
    return this.data.post<void>('user/ChangePassword', entity).pipe();
  }
}
