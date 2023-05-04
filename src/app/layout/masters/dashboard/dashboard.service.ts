import { Observable } from 'rxjs';
import { DashbordModel, StudyConfig, DatabaseConfig, StudyConfigPremise, StudyModuleModel, CompanyModuleModel, DeleteStudyConfig, LoginPreferenceModel, ChildCompnayModel } from './dashbord.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DashbordService extends BaseApiService<DashbordModel> {
  constructor(protected dataService: DataService) {
    super('company', dataService);
  }

  getAllCompany(isDelete?: boolean): Observable<DashbordModel[]> {
    return this.dataService.get<DashbordModel[]>(`company/${isDelete}`);
  }

  getAllStudy(isDelete?: boolean): Observable<StudyConfig[]> {
    return this.dataService.get<StudyConfig[]>(`study/${isDelete}`);
  }

  saveStudy(data: StudyConfig): Observable<StudyConfig> {
    if (data.id > 0) {
      return this.dataService.put<StudyConfig>('study', data);
    } else {
      return this.dataService.post<StudyConfig>('study', data);
    }
  }

  deleteStudy(id: number) {
    return this.dataService.delete<void>('study', id);
  }

  getDatabaseConfig(id?: number): Observable<DatabaseConfig> {
    return this.dataService.get<DatabaseConfig>(`databaseconfig/${id}`);
  }

  saveDatabaseconfig(data: DatabaseConfig): Observable<DatabaseConfig> {
    if (data.id > 0) {
      return this.dataService.put<DatabaseConfig>('databaseconfig', data);
    } else {
      return this.dataService.post<DatabaseConfig>('databaseconfig', data);
    }
  }

  getStudyConfig(id?: number): Observable<StudyConfigPremise> {
    return this.dataService.get<StudyConfigPremise>(`study/getpremiseStudy/${id}`);
  }


  saveStudyconfig(data: StudyConfigPremise): Observable<StudyConfigPremise> {
    if (data.id > 0) {
      return this.dataService.put<StudyConfigPremise>('study/updatepremiseStudy', data);
    } else {
      return this.dataService.post<StudyConfigPremise>('study/savepremiseStudy', data);
    }
  }

  //Role Permisiion
  getModules(id: number): Observable<StudyModuleModel[]> {
    return this.dataService.get<StudyModuleModel[]>(`RolePermission/${id}`);
  }

  saveStudyModule(data: StudyModuleModel[]): Observable<StudyModuleModel[]> {
    return this.dataService.post<StudyModuleModel[]>('RolePermission', data);
  }

  getCompanyModules(id: number): Observable<CompanyModuleModel[]> {
    return this.dataService.get<CompanyModuleModel[]>(`RolePermission/GetCompanyfeature/${id}`);
  }
  saveCompanyFeatures(data: CompanyModuleModel[]): Observable<CompanyModuleModel[]> {
    return this.dataService.post<CompanyModuleModel[]>('RolePermission/SaveCompanyfeature', data);
  }

  // updatePermissionRole(data: RolePermissionModel[]): Observable<RolePermissionModel[]> {
  //   return this.dataService.put<RolePermissionModel[]>('RolePermission', data)
  // }

  checkDatabasevalidate(data: DatabaseConfig): Observable<boolean> {
    return this.dataService.post<boolean>('databaseconfig/checkDatabasevalidate', data);
  }

  createDatabase(data: DatabaseConfig): Observable<boolean> {
    return this.dataService.post<boolean>('databaseconfig/createDatabase', data);
  }
  patchStudy(id: number) {
    return this.dataService.patch<void>('study', id);
  }
 

  getZoneList(): Observable<any> {
    return this.dataService.get<any>('zone/GetZoneDropdown');
  }
  GetCompanyList(): Observable<any> {
    return this.dataService.get<any>('study/GetCompanyList');
  }
  DeleteStudyconfig(data: DeleteStudyConfig): Observable<DeleteStudyConfig> {
      return this.dataService.put<DeleteStudyConfig>('study/DeleteStudyconfig', data);
  
  }
  getLoginPreference(isDelete?: boolean): Observable<LoginPreferenceModel[]> {
    return this.dataService.get<LoginPreferenceModel[]>(`loginpreference/${isDelete}`);
  }
  saveLoginPreference(data: LoginPreferenceModel): Observable<LoginPreferenceModel> {
    if (data.id > 0) {
      return this.dataService.put<LoginPreferenceModel>('loginpreference', data);
    } else {
      return this.dataService.post<LoginPreferenceModel>('loginpreference', data);
    }
  }

  //Chirag
  saveChildCompany(data: ChildCompnayModel): Observable<ChildCompnayModel> {
    if (data.id > 0) {
      return this.dataService.put<ChildCompnayModel>('company/EditCompany', data);
    } else {
      return this.dataService.post<ChildCompnayModel>('company/AddCompany', data);
    }
  }


  getChildCompany(id: number): Observable<any[]> {
    return this.dataService.get<any[]>('company/GetChildCompaniesList/' +id);
  }

  getCompanyCode(id:number): Observable<any>{
    return this.dataService.get<any>('company/GetCompanyCode/' + id);
  }

  DeleteCompany(id:number){
    return this.dataService.delete<void>('company/DeleteCompany', id);
  }

}
