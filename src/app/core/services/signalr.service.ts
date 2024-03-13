import { Destroyer } from './../utils/destroyer';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService extends Destroyer {
  constructor(private utils: UtilityService, private router: Router) {
    super();
  }

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
   
  };
}
