import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BreadcrumbService {

  private parentMenu = new BehaviorSubject('');
  private chileMenu = new BehaviorSubject('');
  mainMenu = this.parentMenu.asObservable();
  subMenu = this.chileMenu.asObservable();

  constructor() { }

  changeMain(message: string) {
    this.parentMenu.next(message)
  }

  changeSub(subMenu:string){
    this.chileMenu.next(subMenu)
  }

}