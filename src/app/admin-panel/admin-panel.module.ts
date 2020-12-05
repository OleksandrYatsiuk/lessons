import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { PageContextComponent } from './page-context/page-context.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    UsersComponent,
    MessagesComponent,
    PageContextComponent,
    AdminPanelComponent,
    CoursesComponent,
    UserProfileComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ],
  exports: [
  ]
})
export class AdminPanelModule { }
