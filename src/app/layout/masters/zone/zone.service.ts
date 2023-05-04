import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ZoneModel } from './ZoneModel';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseApiService<ZoneModel> {
  constructor(protected dataService: DataService) {
    super('zone', dataService);
  }

  getAllZone(isDelete?: boolean): Observable<ZoneModel[]> {
    return this.dataService.get<ZoneModel[]>(`zone/${isDelete}`);
  }
}
