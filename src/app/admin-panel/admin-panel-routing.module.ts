import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PageContextComponent } from './page-context/page-context.component';
import { MessagesComponent } from './messages/messages.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '', component: AdminPanelComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'pages', component: PageContextComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'courses', loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule) },
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
