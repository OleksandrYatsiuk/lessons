import { MessagesResolver } from './messages/messages.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { PageContextComponent } from './page-context/page-context.component';
import { MessagesComponent } from './messages/messages.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { AuthGuard } from '../module-shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: '', component: AdminPanelComponent,
    children: [
      { path: 'pages', component: PageContextComponent },
      { path: 'messages', component: MessagesComponent, resolve: { chat: MessagesResolver } },
      { path: 'users', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule) },
      { path: 'courses', loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule) },
      { path: 'lessons', loadChildren: () => import('./lessons/lessons.module').then(mod => mod.LessonsModule) },
      { path: 'certificates', component: CertificatesComponent },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [MessagesResolver, AuthGuard]
})
export class AdminPanelRoutingModule { }
