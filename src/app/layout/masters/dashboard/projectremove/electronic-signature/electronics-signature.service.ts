import { Observable,  } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import {  AppUser } from './electronics-signature.model';

@Injectable({
  providedIn: 'root'
})
export class ElectronicsSignatureService  {
  constructor(protected dataService: DataService) {
  }

validateUserForSignature(dto: AppUser): Observable<void> {
  return this.dataService.post<void>(`login/ValidateUserForSignature`, dto);
  }
}
