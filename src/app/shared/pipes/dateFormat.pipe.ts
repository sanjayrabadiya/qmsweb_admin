import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/core/services/storage.service';

@Pipe({
  name: 'dateFormat'
})
export class DateFormat implements PipeTransform {
  dateformate: string;
  constructor(private storageService: StorageService) {}

  transform(value: Date) { 
    const datePipe = new DatePipe('en-US');
    this.dateformate = datePipe.transform(value, this.storageService.GeneralSettings.dateFormat);
    return this.dateformate;
  }
}
