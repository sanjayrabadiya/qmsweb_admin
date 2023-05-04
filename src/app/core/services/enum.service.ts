import { DataService } from 'src/app/core/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumModel } from '../models/enum-model';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  ctrlName = 'Enums';
  constructor(private data: DataService) {}

  // getDateFormats(): Observable<EnumModel[]> {
  //   return this.data.get<EnumModel[]>(`${this.ctrlName}/DateFormats`);
  // }

  // getTimeFormats(): Observable<EnumModel[]> {
  //   return this.data.get<EnumModel[]>(`${this.ctrlName}/TimeFormats`);
  // } 
}
