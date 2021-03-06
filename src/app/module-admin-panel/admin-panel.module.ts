import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { PageContextComponent } from './page-context/page-context.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from '../module-shared/shared.module';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { UploadItemComponent } from './certificates/upload-item/upload-item.component';



@NgModule({
  declarations: [
    UsersComponent,
    MessagesComponent,
    PageContextComponent,
    AdminPanelComponent,
    UserProfileComponent,
    LoginComponent,
    CertificatesComponent,
    UploadItemComponent,
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
