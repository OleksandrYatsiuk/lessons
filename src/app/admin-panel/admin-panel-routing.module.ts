import { UsersRoutingModule } from './users/users-routing.module';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { PageContextComponent } from './page-context/page-context.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '', component: AdminPanelComponent,
    children: [
      { path: 'pages', component: PageContextComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'users', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule) },
      { path: 'courses', loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule) },
      { path: 'lessons', loadChildren: () => import('./lessons/lessons.module').then(mod => mod.LessonsModule) },
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPanelRoutingModule { }
