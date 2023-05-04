import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.baseUrl = '';
  }

  get<T>(url: string, id?: number | boolean, params?: any, headers?: any): Observable<T> {
    const options = {};
    if (params) {
      options['params'] = params;
    }
    if (headers) {
      options['headers'] = headers;
    }

    if (id !== null && id !== undefined) {
      return this.httpClient.get<T>(`${url}/${id}`, options);
    } else {
      return this.httpClient.get<T>(`${url}`, options);
    }
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${url}`, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`${url}`, data);
  }

  delete<T>(url: string, id: number): Observable<T> {
    return this.httpClient.delete<T>(`${url}/${id}`);
  }

  patch<T>(url: string, id: number, data?: any): Observable<T> {
    return this.httpClient.patch<T>(`${url}/${id}`, data);
  }
}
