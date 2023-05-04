import { BaseMasterModel } from './../masters.models';
export interface DashbordModel extends BaseMasterModel {
  id: number;
  companyCode: string;
  companyName: string;
  phone: string;
  address: string;
  email: string;
  type: number;
  noofStudy: number;
  zoneMasterId: number;
  zoneMaster: string;
}

export class DatabaseConfig {
  id: number;
  serverName: string;
  databaseName: string;
  serverLoginName: string;
  serverPassword: string;
  documentPath: string;
  imagePath: string;
  companyID: number;
}


export interface StudyConfig extends BaseMasterModel {
  id: number;
  companyID: number;
  noofStudy: number;
  validFrom: Date;
  validTo: Date;
  type: number;
  companyName: string;
}

export interface StudyConfigPremise {
  id: number;
  noofStudy: number;
  validFrom?: Date;
  validTo?: Date;
  companyID: number;
  type: number;
}
export class StudyModuleModel {
  studyID: number;
  moduleID: number;
  moduleCode: string;
  moduleName: string;
  parentModuleID?: number;
  canActive: boolean;
  hasChild: boolean;
}


export class CompanyModuleModel {
  companyID: number;
  moduleID: number;
  moduleCode: string;
  moduleName: string;
  parentModuleID?: number;
  canActive: boolean;
  hasChild: boolean;
}
export interface DeleteStudyConfig {
  id: number;
  reasonId?: number;
  reasonOth?: string;
}
export class LoginPreferenceModel {
  id?: number;
  minPasswordLength?: number;
  requiredSpecialChar?: boolean;
  requiredAlphaNumber?: boolean;
  requiredCapital?: boolean;
  expiredDay?: number;
  maxLoginAttempt?: number;
  companyId?: number;
  companyName : string;
}

//Chirag 

export class ChildCompnayModel {
  id?: number;
  companyCode?: number;
  childcompanyCode?:number;
  childaddress?: string;
  childemail?: string;
  childphone?: number;
  parentCompnayId?: number;
  childcompanyName : string;
  childzoneMasterId? : number;
  zoneList?: any
}

export interface ssl {
  value: boolean;
  viewValue: string;
}

export class DropDownModel {
  id?: number;
  value?: string;
  code?: string;
 
}
