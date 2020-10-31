import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { PageContextComponent } from './page-context/page-context.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { ChatActionsComponent } from './messages/chat-actions/chat-actions.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';



@NgModule({
  declarations: [
    UsersComponent,
    MessagesComponent,
    PageContextComponent,
    AdminPanelComponent,
    CoursesComponent,
    MessageItemComponent,
    ChatActionsComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
