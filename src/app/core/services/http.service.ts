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
  public put(path: string, body: object, options?: any): Observable<object> {
    return this.http.put(`${this.apiUrl}${path}`, body, options);
  }
  public postFormData(path: string, body: object, options?: any, fullPath?: boolean): Observable<object> {
    body = this.getFormData(body);
    fullPath ? path = path : path = `${this.apiUrl}${path}`;
    return this.http.post(path, body, options);
  }
  public path(path: string, body: object, options?: any): Observable<object> {
    return this.http.patch(`${this.apiUrl}${path}`, body, options);
  }
  public delete(path: string, options?: object): Observable<object> {
    return this.http.delete(`${this.apiUrl}${path}`, options);
  }



  private getFormData(raw: object): FormData {
    const formData = new FormData();

    Object.entries(raw)
      .filter(([param, value]) => value !== null)
      .forEach(([param, value]) => {
        if (Array.isArray(value)) {
          this.setArrayKeys(formData, param, value);
        } else if (typeof value === 'object') {
          if (value instanceof File) {
            formData.append(param, value);
          } else {
            this.setObjectKeys(formData, param, value);
          }
        } else {
          formData.append(param, value);
        }
      });
    return formData;
  }

  private setArrayKeys(formData: FormData, param: string, array: string[]): void {
    array.forEach((el, index) => {
      formData.append(`${param}[${index}]`, el);
    });
  }

  private setObjectKeys(formData: FormData, param: string, object: object): void {
    // tslint:disable-next-line: forin
    for (const key in object) {
      formData.append(`${param}[${key}]`, object[key]);
    }
  }
}
