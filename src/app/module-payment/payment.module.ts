import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../module-shared/shared.module';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
  { path: ':id', component: PaymentStatusComponent },
];


@NgModule({
  declarations: [
    PaymentComponent,
    PaymentStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PaymentModule { }
