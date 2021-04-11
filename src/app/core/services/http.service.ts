import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { transformToFormData } from '@utils/form-data-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public get(path: string, options?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, options);
  }
  public post(path: string, body: any, options?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, body, options);
  }
  public put(path: string, body: any, options?: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, body, options);
  }
  public postFormData(path: string, body: any, options?: any, fullPath?: boolean): Observable<any> {
    body = transformToFormData(body);
    fullPath ? path = path : path = `${this.apiUrl}${path}`;
    return this.http.post(path, body, options);
  }
  public path(path: string, body: any, options?: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}${path}`, body, options);
  }
  public delete(path: string, options?: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`, options);
  }

}
