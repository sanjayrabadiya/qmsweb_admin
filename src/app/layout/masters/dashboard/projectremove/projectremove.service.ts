import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ProjectDataRemoveList, ProjectDataRemoveModel } from './projectremove.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjectDataRemoveService extends BaseApiService<ProjectDataRemoveModel> {
  constructor(protected dataService: DataService, private httpClient: HttpClient) {
    super('company', dataService);
  }

  GetDatabaseConfig(): Observable<any> {
    return this.dataService.get<any>('studyRemove/GetDatabaseConfigList');
  }
  GetStudyListByCompanyid(id: number): Observable<any> {
    return this.dataService.get<any>(`studyRemove/GetStudyListByCompanyid/${id}`);
  }
  GetStudyListByprojectid(id: number, code: string): Observable<any> {
    return this.dataService.get<any>(`studyRemove/GetStudyListByprojectid/${id}/${code}`);
  }

  GetData(id: number): Observable<any> {
    return this.dataService.get<any>(`studyRemove/GetData/${id}`);
  }
  GetDataById(id: number): Observable<any> {
    return this.dataService.get<any>(`studyRemove/GetDataById/${id}`);
  }
  BackupDatabase(data: ProjectDataRemoveModel): Observable<any> {

    return this.httpClient.post(`studyRemove/DataBasebackup`, data
      , { headers: { hideLoader: 'true' } });
  }

  ApplicationBackup(data: ProjectDataRemoveModel): Observable<ProjectDataRemoveModel> {
    return this.dataService.post<ProjectDataRemoveModel>('studyRemove/ApplicationBackup', data);
  }
  DeleteStudy(data: ProjectDataRemoveModel): Observable<ProjectDataRemoveModel> {
    return this.dataService.post<ProjectDataRemoveModel>('studyRemove/RemoveProjectData', data);
  }
  Archieve(data: ProjectDataRemoveModel): Observable<ProjectDataRemoveModel> {
    return this.dataService.post<ProjectDataRemoveModel>('studyRemove/Archieve', data);
  }


  GetAllProjectRemoveList(isDelete?: boolean): Observable<ProjectDataRemoveList[]> {
    return this.dataService.get<ProjectDataRemoveList[]>(`studyRemove/${isDelete}`);
  }
  GetRemoveTypes(): Observable<any> {
    return this.dataService.get<any>('studyRemove/GetRemoveType');
  }
}
