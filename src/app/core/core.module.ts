import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from './services/payment.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    PaymentService
  ]
})
export class CoreModule { }
