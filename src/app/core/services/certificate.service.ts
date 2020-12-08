import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ICertificate } from '../interfaces/certificates';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateDataService {

  constructor(private http: HttpService) { }
  private path = `/certificates`;

  public queryCreate(body: Partial<ICertificate>): Observable<ICertificate> {
    return this.http.post(this.path, body).pipe(pluck('result'));
  }
  public queryList(params?: Partial<ICertificate>): Observable<ICertificate[]> {
    return this.http.get(this.path, { params }).pipe(pluck('result'));
  }
  public queryDelete(id: ICertificate['id']): Observable<null> {
    return this.http.delete(`${this.path}/${id}`).pipe(pluck('result'));
  }
}
