import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';


const router: Routes = [
  { path: ':url', component: TermsAndConditionsComponent },
  { path: '', redirectTo: '/pages/terms-and-conditions' },
];

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ]
})
export class StaticPagesModule { }
