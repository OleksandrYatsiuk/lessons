import { Payments } from './../interfaces/payments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod'
import { PaymentsResult } from '../interfaces/payments';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createPayment(params: Partial<Payments>): Observable<PaymentsResult> {
    return this.http.post(`${this.apiUrl}/payments`, params).pipe(pluck('result'));
  }


}
