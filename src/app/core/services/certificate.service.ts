import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ICertificate } from '../interfaces/certificates';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateDataService {
  private path = `/certificates`;

  constructor(private http: HttpService) { }

  public queryCreate(body: Partial<ICertificate>): Observable<ICertificate> {
    return this.http.post(this.path, body).pipe(pluck('result'));
  }
  public queryList(params?: Partial<ICertificate>): Observable<ICertificate[]> {
    return this.http.get(this.path, { params }).pipe(pluck('result'));
  }
  public queryDelete(id: ICertificate['id']): Observable<null> {
    return this.http.delete(`${this.path}/${id}`).pipe(pluck('result'));
  }
  public queryRefresh(id: ICertificate['id'], fileId: string): Observable<ICertificate> {
    return this.http.put(`${this.path}/${id}`, { fileId }).pipe(pluck('result'));
  }
}
