import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseOverviewResolver } from './course-overview.resolver';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
  },
  {
    path: ':id', component: CourseItemComponent,
    resolve: { course: CourseOverviewResolver }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [CourseOverviewResolver]
})
export class CoursesRoutingModule { }
