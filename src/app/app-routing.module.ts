import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { StartBotComponent } from './start-bot/start-bot.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  { path: 'start', component: StartBotComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
