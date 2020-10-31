import { DeleteComponent } from './../../shared/components/dialogs/delete/delete.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  providers: [DeleteComponent]
})
export class UsersModule { }
