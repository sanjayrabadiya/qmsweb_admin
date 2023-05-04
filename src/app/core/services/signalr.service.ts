import { Destroyer } from './../utils/destroyer';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { GeneralSettingsModel } from '../models/general-settings';

@Injectable({
  providedIn: 'root'
})
export class SignalRService extends Destroyer {
  constructor(private utils: UtilityService, private router: Router) {
    super();
  }

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    // this.subs = this.utils.data.get('appsetting/GetGeneralSettings').subscribe((resp: GeneralSettingsModel) => {
    //   const url = resp.signalrUrl;
    //   this.hubConnection = new signalR.HubConnectionBuilder().withUrl(url).build();
    //   this.hubConnection
    //     .start()
    //     .then(() => console.log('Connection started'))
    //     .catch((err) => console.log('Error while starting connection: ' + err));

    //   this.hubConnection.on('logofffromeverywhere', (data) => {       
    //     const currentUser = this.utils.storage.CurrentUser;
    //     if (!currentUser || currentUser.userId === data) {
    //       this.router.navigate(['/auth/force-logout']);
    //     }
    //   });
    // });
  };
}
