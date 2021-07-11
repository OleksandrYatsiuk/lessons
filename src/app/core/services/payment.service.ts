import { Payments } from './../interfaces/payments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createPayment(params: Partial<Payments>): Observable<string> {
    return this.http.post<any & { result: string }>(`${this.apiUrl}/payments`, params).pipe(pluck('result'));
  }

  public checkPaymentStatus(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/${id}/status`, {})
      .pipe(pluck('result'));
  }
  public paymentDetails(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/${id}`, {})
      .pipe(pluck('result'));
  }
}
