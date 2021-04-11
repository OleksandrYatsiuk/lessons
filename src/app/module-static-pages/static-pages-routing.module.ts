import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

const router: Routes = [
  { path: 'terms-and-condition', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule { }
