import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) { }

  public createPayment(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments`, params).pipe(pluck('result'));
  }

  
}
