import { Destroyer } from './core/utils/destroyer';
import { UtilityService } from 'src/app/core/services/utility.service';
import { SignalRService } from './core/services/signalr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <app-loader></app-loader>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent extends Destroyer implements OnInit {
  constructor(private utils: UtilityService, private signalRServer: SignalRService) {
    super();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
