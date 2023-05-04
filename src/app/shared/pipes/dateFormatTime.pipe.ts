import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/core/services/storage.service';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormat implements PipeTransform {
  dateformate: string;
  constructor(private storageService: StorageService) {}

  transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, this.storageService.GeneralSettings.dateFormat + ' ' + this.storageService.GeneralSettings.timeFormat);
    return value;
  }
}
