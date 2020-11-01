import { Payments } from './../core/interfaces/payments';
import { Observable } from 'rxjs';
import { User } from 'src/app/admin-panel/users/users.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../core/services/payment.service';
import { UserDataService } from '../core/services/user-data.service';
import { PaymentsResult } from '../core/interfaces/payments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public form: FormGroup;
  public user: User;
  loading = false;
  private maxLength = 100;
  constructor(private fb: FormBuilder,
    private payment: PaymentService,
    private http: UserDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route
      .queryParams
      .subscribe(({ chat_id }) => {
        if (chat_id) {
          this.http.getItem({ chat_id: chat_id })
            .subscribe(user => this.form.patchValue(user))
        }
      });
  }
  public initForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    })
  }
  public pay(): void {
    if (this.form.valid) {
      this.loading = true;
      this.http.update(this.form.value)
        .subscribe(user => {
          this.loading = false;
          let orderId = Date.now();
          this._queryPreparePayment({ ...this.form.value, amount: 1000, description: 'Order # ' + orderId, order_id: orderId })
            .subscribe(result => {
              window.open(this._generatePaymentLink(result), '_blank');
            })
        }, (error) => {
          this.loading = false;

        })
    }

  }

  private _queryPreparePayment(data: Partial<Payments>): Observable<PaymentsResult> {
    return this.payment.createPayment(data);
  }
  private _generatePaymentLink(payment: PaymentsResult): string {
    return `https://www.liqpay.ua/api/3/checkout?data=${payment.data}&signature=${payment.signature}`;

  }
}
