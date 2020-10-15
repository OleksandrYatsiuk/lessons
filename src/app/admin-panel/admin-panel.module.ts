import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { PageContextComponent } from './page-context/page-context.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UsersComponent,
    MessagesComponent,
    PageContextComponent,
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
