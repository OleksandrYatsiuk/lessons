import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../core/services/payment.service';
import { UserDataService } from '../core/services/user-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public form: FormGroup;
  public user: any
  private maxLength = 100;
  constructor(private fb: FormBuilder,
    private payment: PaymentService,
    private http: UserDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.route
      .queryParams
      .subscribe(params => {
        this.http.getItem({ chat_id: params.chat_id })
          .subscribe(user => this.form.patchValue(user))
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
      this.http.update(this.form.value).subscribe(user => {
        console.log(user);
        let orderId = Date.now();
        this.payment.createPayment(Object.assign(this.form.value,
          { amount: 1000, description: 'Order # ' + orderId, order_id: orderId })).subscribe(({ data, signature }) => {
            const link = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;
            window.open(link, '_blank');
          })
      }, (error) => {

      })
    }


  }

}
