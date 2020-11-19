import { LessonCreateComponent } from './lesson-create/lesson-create.component';
import { LessonOverviewResolver } from './lesson-overview.resolver';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { LessonsComponent } from './lessons/lessons.component';
import { DirtyFormGuard } from 'src/app/shared/guards/dirty-form.guard';

const routes: Routes = [
  { path: '', component: LessonsComponent },
  {
    path: 'create', component: LessonCreateComponent,
    canDeactivate: [DirtyFormGuard]
  },
  {
    path: ':id', component: LessonItemComponent,
    resolve: { lesson: LessonOverviewResolver },
    canDeactivate: [DirtyFormGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [LessonOverviewResolver, DirtyFormGuard]
})
export class LessonsRoutingModule { }
