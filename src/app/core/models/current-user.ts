import { GeneralSettingsModel } from './general-settings';

export interface CurrentUserModel {
  companyLogo: string;
  companyName: string;
  email: string;
  expiredAfter: string;
  firstName: string;
  lastName: string;
  loginReportId: number;
  refreshToken: string;
  roleId: number;
  roleName: string;
  token: string;
  userId: number;
  userName: string;
  userPicUrl: string; 
  generalSettings: GeneralSettingsModel;
  roleTokenId:any;
  isAuthenticated:boolean;
  isFirstTime :boolean;
}
