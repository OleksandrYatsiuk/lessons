import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserProgressComponent } from './user-progress/user-progress.component';
import { SharedModule } from 'src/app/module-shared/shared.module';



@NgModule({
  declarations: [UserChatComponent, UserProgressComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
