import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeworkComponent } from './components/homework/homework.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: ':id', component: HomeworkComponent
}];

@NgModule({
  declarations: [HomeworkComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeworkModule { }
