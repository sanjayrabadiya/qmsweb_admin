import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { EnumService } from './enum.service';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DropDownService } from './drop-down.service';
import { FormGroup } from '@angular/forms';
import { Constant } from '../constants/constants';
import { ToasterService } from './toaster.service';
import { BaseSettingsModel } from '../models/base-settings.model';
import { DataManager } from '@syncfusion/ej2-data';
import { Observable } from 'rxjs-compat/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { fromEvent } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  subscriptions: Subscription[] = [];
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  constructor(
    public data: DataService,
    public dropDown: DropDownService,
    public toast: ToasterService,
    public enums: EnumService,
    public storage: StorageService,
    private http: HttpClient,
    public toastr: ToastrService
  ) {
    this.loadBaseSettings();
  }

  // filterSettings: DropDownFilterSettings = {
  //   caseSensitive: false,
  //   operator: 'contains'
  // };

  confirmDelete(): boolean {
    if (!confirm(Constant.message.deleteConfirmation)) {
      return false;
    }

    return true;
  }

  validForm(fg: FormGroup, valid: boolean): boolean {
    Object.keys(fg.controls).forEach((controlName: string) => {
      const control = fg.get(controlName);
      if (control instanceof FormGroup) {
        valid = this.validForm(control, valid);
      } else {
        if (control.errors) {
          control.markAsTouched();
          valid = false;
        }
      }
    });

    return valid;
  }

  public getTimeZone(): string {
    return /\((.*)\)/.exec(new Date().toString())[1];
  }

  public toBoolean(value: any) {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      value = value.trim().toLowerCase();
    }
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }

  private loadBaseSettings(): void {
    this.http.get<BaseSettingsModel>('assets/base-settings.json').subscribe((settings) => {
      this.storage.setBaseSettings(settings);
    });
  }

  public dataManager(url:string)
  {
    const baseUrl = this.storage.BaseUrl+url;
    const dm = new DataManager({url:baseUrl,
    headers:[{
        authorization: 'Bearer '+this.storage.Token
    }]});

    return dm;
  }

  InternetStatus() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.toastr.success('Internet connection established.', '', { timeOut: 0, positionClass: 'toast-bottom-left' });
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.toastr.error('Connection lost! You are not connected to internet.', '', {
          timeOut: 0,
          positionClass: 'toast-bottom-left'
        });
      })
    );
  }
}
