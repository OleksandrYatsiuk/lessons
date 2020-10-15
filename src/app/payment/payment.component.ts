import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../core/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public form: FormGroup;
  private maxLength = 100;
  constructor(private fb: FormBuilder, private payment: PaymentService) { }

  ngOnInit(): void {
    this.initForm();
  }
  public initForm(): void {
    this.form = this.fb.group({
      name: ['',],
      email: ['',],
      phone: ['',]
    })
  }
  public pay(): void {
    console.log(this.form.value)
    let orderId = Date.now();
    this.payment.createPayment(Object.assign(this.form.value,
      { amount: 1000, description: 'Order # ' + orderId, order_id: orderId })).subscribe(({ data, signature }) => {
        const link = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;
        window.open(link, '_blank');
      })
  }

}
