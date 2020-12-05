import { PaymentStatusComponent } from './payment/payment-status/payment-status.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { StartBotComponent } from './start-bot/start-bot.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  {
    path: 'admin', loadChildren: () => import('./admin-panel/admin-panel.module').then(mod => mod.AdminPanelModule),
    canActivate: [AuthGuard]
  },
  { path: 'pages', loadChildren: () => import('./static-pages/static-pages.module').then(mod => mod.StaticPagesModule) },
  { path: 'homework', loadChildren: () => import('./homework/homework.module').then(mod => mod.HomeworkModule) },
  { path: 'start', component: StartBotComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment/:id', component: PaymentStatusComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
