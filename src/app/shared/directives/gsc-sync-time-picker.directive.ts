import { Directive } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Directive({
  selector: '[gscSyncTimePicker]'
})
export class GscSyncTimePickerDirective {
  constructor(private timePicker: TimePickerComponent, private storageService: StorageService) {
    this.timePicker.format = this.storageService.GeneralSettings.timeFormat;
  }
}
