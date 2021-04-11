import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartBotComponent } from './module-start-bot/start-bot.component';
import { AuthGuard } from './module-shared/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./module-main/main.module').then(mod => mod.MainModule) },
  {
    path: 'admin', loadChildren: () => import('./module-admin-panel/admin-panel.module').then(mod => mod.AdminPanelModule),
    canActivate: [AuthGuard]
  },
  { path: 'pages', loadChildren: () => import('./module-static-pages/static-pages.module').then(mod => mod.StaticPagesModule) },
  { path: 'homework', loadChildren: () => import('./module-homework/homework.module').then(mod => mod.HomeworkModule) },
  { path: 'payment', loadChildren: () => import('./module-payment/payment.module').then(mod => mod.PaymentModule) },
  { path: 'start', component: StartBotComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'corrected'
})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
