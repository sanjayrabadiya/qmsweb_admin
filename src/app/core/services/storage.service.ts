import { BaseSettingsModel } from './../models/base-settings.model';
import { Injectable } from '@angular/core';
import { GeneralSettingsModel } from '../models/general-settings';
import { CurrentUserModel } from '../models/current-user';


const TOKEN_KEY = 'AuthToken';
const RIGHTS_KEY = 'Rights';
const GEN_SET_KEY = 'GeneralSettings';
const BASE_URL_KEY = 'baseUrl';
const SIGNALR_URL_KEY = 'signalrUrl';
const REFRESH_TOKEN_KEY = 'refreshToken';
const CURRENT_USER_KEY = 'currentUser';
const AUDIT_REASON_ID = 'audit-reason-id';
const AUDIT_REASON_OTH = 'audit-reason-oth';

@Injectable()
export class StorageService {
  

  private removeItem(key: string) {
    window.sessionStorage.removeItem(key);
  }

  private setItem(key: string, value: string) {
    this.removeItem(key);
    window.sessionStorage.setItem(key, value);
  }

  private getItem(key: string) {
    return window.sessionStorage.getItem(key);
  }

  public setToken(token: string) {
    if (!token) return;
    this.setItem(TOKEN_KEY, token);
  }

  private setRefreshToken(token: string) {
    if (!token) return;
    this.setItem(REFRESH_TOKEN_KEY, token);
  }

 

  private setGeneralSettings(settings: GeneralSettingsModel) {
    if (!settings) return;
    this.setItem(GEN_SET_KEY, JSON.stringify(settings));
  }

  private setBaseUrl(url: string) {
    this.setItem(BASE_URL_KEY, url);
  }

  private setSignalRUrl(url: string) {
    this.setItem(SIGNALR_URL_KEY, url);
  }

  private setCurrentUser(currentUser: CurrentUserModel) {
    if (!currentUser) return;
    this.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }

  setUserData(data: CurrentUserModel) {
    this.setToken(data.token);
    this.setRefreshToken(data.refreshToken);
    this.setGeneralSettings(data.generalSettings);
    delete data.token;
    delete data.refreshToken;
    
    delete data.generalSettings;

    this.setCurrentUser(data);
  }

  setBaseSettings(settings: BaseSettingsModel) {
    this.setBaseUrl(settings.baseUrl);
    this.setSignalRUrl(settings.signalrUrl);
  }

  get BaseUrl(): string {
    const item = this.getItem(BASE_URL_KEY);
    return item;
  }

  get SignalRUrl(): string {
    const item = this.getItem(SIGNALR_URL_KEY);
    return item;
  }

  get Token(): string {
    const item = this.getItem(TOKEN_KEY);
    return item;
  }

  get RefreshToken(): string {
    const item = this.getItem(REFRESH_TOKEN_KEY);
    return item;
  }

  get HasToken(): boolean {
    return this.Token ? true : false;
  }

  get AuthHeader(): string {
    const token = this.Token;
    return token ? 'Bearer ' + token : '';
  }

 
  get GeneralSettings(): GeneralSettingsModel {
    const data = new GeneralSettingsModel();
    data.dateFormat="dd/MM/yyyy";   
    data.timeFormat="hh:mm a";
    data.idle="6000";
    data.timeout="1000";
    data.ping="10";
    return data;
  }

  get CurrentUser(): CurrentUserModel {
    const stringValue = this.getItem(CURRENT_USER_KEY);
    const data = JSON.parse(stringValue) as CurrentUserModel;
    return data;
  }

  get GetAuditReasonId(): string {
    const stringValue = this.getItem(AUDIT_REASON_ID);
    const data = stringValue;
    return data;
  }

  get GetAuditReasonOth(): string {
    const stringValue = this.getItem(AUDIT_REASON_OTH);
    const data = stringValue;
    return data;
  }

  clear() {
    this.removeItem(TOKEN_KEY);
    this.removeItem(RIGHTS_KEY);
    this.removeItem(GEN_SET_KEY);
    this.removeItem(REFRESH_TOKEN_KEY);
    this.removeItem(CURRENT_USER_KEY);
    this.removeItem(AUDIT_REASON_ID);
    this.removeItem(AUDIT_REASON_OTH);
  }

  setAuditReason(result: any) {
    this.setItem(AUDIT_REASON_ID, result.reasonId);
    this.setItem(AUDIT_REASON_OTH, result.reasonOth);
  }

  removeAuditReason() {
    this.removeItem(AUDIT_REASON_ID);
    this.removeItem(AUDIT_REASON_OTH);
  }
}
