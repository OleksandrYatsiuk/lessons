import { environment } from './../../environments/environment.prod';
import { Payments } from './../core/interfaces/payments';
import { EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/admin-panel/users/users.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../core/services/payment.service';
import { UserDataService } from '../core/services/user-data.service';
import { PaymentsResult } from '../core/interfaces/payments';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private payment: PaymentService,
    private http: UserDataService,
    private route: ActivatedRoute
  ) { }
  form: FormGroup;
  user: User;
  loading = false;

  ngOnInit(): void {
    this.initForm();
    this.route
      .queryParams
      .subscribe(({ chat_id }) => {
        if (chat_id) {
          this.http.getItem({ chat_id })
            .subscribe(user => this.form.patchValue(user));
        }
      });
  }
  public initForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    });
  }
  public pay(): void {
    if (this.form.valid) {
      this.loading = true;
      this.loading = false;
      const orderId = Date.now();
      this._queryPreparePayment({
        ...this.form.value, amount: 1, description: 'Order # ' + orderId,
        order_id: orderId,
        result_url: `${environment.apiUrl}/payments/${orderId}`
      })
        .subscribe(link => {
          window.open(link, '_blank');
        });
    }
  }

  private _queryPreparePayment(data: Partial<Payments>): Observable<string> {
    return this.payment.createPayment(data).pipe(
      catchError(e => {
        console.error(e);
        this.loading = false;
        return EMPTY;
      }));
  }
}
