import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-course-price',
  templateUrl: './course-price.component.html',
  styleUrls: ['./course-price.component.scss']
})
export class CoursePriceComponent implements OnInit {
  public price: number= 10;
  public orderId: string= 'aazz123'
  constructor(private payment: PaymentService) { }

  ngOnInit(): void {

  }

  addPayment(price: number, orderId:string): void {
    this.payment.createPayment({
      amount: price,
      description: 'Order # '+ orderId,
      order_id: orderId,
    }).subscribe(({ data, signature }) => {
      const link = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;
      window.open(link, '_blank');
    })
  }
}
