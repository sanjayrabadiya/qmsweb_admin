import { DataService } from 'src/app/core/services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  ctrlName = 'Enums';
  constructor(private data: DataService) {}

 
}
