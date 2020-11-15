import { LessonCreateComponent } from './lesson-create/lesson-create.component';
import { LessonOverviewResolver } from './lesson-overview.resolver';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { LessonsComponent } from './lessons/lessons.component';

const routes: Routes = [
  { path: '', component: LessonsComponent },
  { path: 'create', component: LessonCreateComponent },
  { path: ':id', component: LessonItemComponent, resolve: { lesson: LessonOverviewResolver } },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [LessonOverviewResolver]
})
export class LessonsRoutingModule { }
