import { Observable,  } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import {  AppUser } from './electronics-signature.model';

@Injectable({
  providedIn: 'root'
})
export class electronicsSignatureService  {
  constructor(protected dataService: DataService) {
  }

validateUserForSignature(dto: AppUser): Observable<void> {
  return this.dataService.post<void>(`login/ValidateUserForSignature`, dto);
  }
}
