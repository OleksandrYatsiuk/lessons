import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ICertificate } from '../interfaces/certificates';

@Injectable({
  providedIn: 'root'
})
export class CertificateDataService {
  private path = `/certificates`;
  private _apiUrl = environment.apiNestUrl;

  constructor(private _http: HttpClient) { }

  queryCreate(body: Partial<ICertificate>): Observable<ICertificate> {
    return this._http.post<ICertificate>(`${this._apiUrl}${this.path}`, body);
  }
  queryList(params?: Partial<ICertificate>): Observable<ICertificate[]> {
    const options = {
      params: new HttpParams()
        .set('userId', params?.userId || null)
        .set('courseId', params?.courseId || null)
    };
    return this._http.get<ICertificate[]>(`${this._apiUrl}${this.path}`, options);
  }
  queryDelete(id: ICertificate['id']): Observable<null> {
    return this._http.delete<null>(`${this._apiUrl}${this.path}/${id}`);
  }
  queryRefresh(id: ICertificate['id'], fileId: string): Observable<ICertificate> {
    return this._http.put<ICertificate>(`${this._apiUrl}${this.path}/${id}`, { fileId });
  }
}
