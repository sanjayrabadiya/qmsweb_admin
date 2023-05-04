import { Observable } from 'rxjs';
import { DataService } from './data.service';

export abstract class BaseApiService<T> {
  constructor(protected ctrl: string, protected dataService: DataService) {}

  getOneById(id: number): Observable<T> {
    return this.dataService.get<T>(this.ctrl, id);
  }

  public getAll(): Observable<T[]> {
    return this.dataService.get<T[]>(this.ctrl);
  }

  public save(data: T, id: number): Observable<number> {
    if (id > 0) {
      return this.dataService.put<number>(this.ctrl, data);
    } else {
      return this.dataService.post<number>(this.ctrl, data);
    }
  }

  public delete(id: number): Observable<void> {
    return this.dataService.delete<void>(this.ctrl, id);
  }
}
