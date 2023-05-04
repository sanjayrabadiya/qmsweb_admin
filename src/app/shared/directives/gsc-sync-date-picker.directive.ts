import { Directive } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Directive({
  selector: '[gscSyncDatePicker]'
})
export class GscSyncDatePickerDirective {
  constructor(private datePicker: DatePickerComponent, private storageService: StorageService) {
    this.datePicker.format = this.storageService.GeneralSettings.dateFormat;
  }
}
