import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  payment: any;
  constructor(private route: ActivatedRoute, private http: PaymentService) { }

  ngOnInit(): void {
    this._queryCheckPaymentStatus(this.route.snapshot.params.id)
      .subscribe(result => this.payment = result);
  }

  private _queryCheckPaymentStatus(id: number): Observable<any> {
    return this.http.checkPaymentStatus(id);
  }
  private _queryPaymentDetails(id: number): Observable<any> {
    return this.http.paymentDetails(id);
  }
}
