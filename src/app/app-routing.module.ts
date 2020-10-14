import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartBotComponent } from './start-bot/start-bot.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  { path: 'start', component: StartBotComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
