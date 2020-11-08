import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public get(path: string, options?: object): Observable<object> {
    return this.http.get(`${this.apiUrl}${path}`, options);
  }
  public post(path: string, body: object, options?: any): Observable<object> {
    return this.http.post(`${this.apiUrl}${path}`, body, options);
  }
  public path(path: string, body: object, options?: any): Observable<object> {
    return this.http.patch(`${this.apiUrl}${path}`, body, options);
  }
  public delete(path: string, options?: object): Observable<object> {
    return this.http.delete(`${this.apiUrl}${path}`, options);
  }
}
