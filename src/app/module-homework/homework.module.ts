import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeworkComponent } from './components/homework/homework.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SharedModule } from '../module-shared/shared.module';
import { LessonOverviewResolver } from '../module-admin-panel/lessons/lesson-overview.resolver';
import { LessonsPublicListComponent } from './components/lessons-public-list/lessons-public-list.component';

const routes: Routes = [
  { path: 'lessons', component: LessonsPublicListComponent },
  { path: 'lessons/:id', component: HomeworkComponent }
];

@NgModule({
  declarations: [
    HomeworkComponent,
    ConfirmModalComponent,
    LessonsPublicListComponent
  ]
  ,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [LessonOverviewResolver]
})
export class HomeworkModule { }
