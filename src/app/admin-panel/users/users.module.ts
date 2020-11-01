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
  entryComponents: [DeleteComponent]
})
export class UsersModule { }
