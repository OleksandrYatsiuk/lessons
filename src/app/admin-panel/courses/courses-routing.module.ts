import { CourseCreateComponent } from './course-create/course-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseOverviewResolver } from './course-overview.resolver';
import { DirtyFormGuard } from 'src/app/module-shared/guards/dirty-form.guard';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
    canDeactivate: [DirtyFormGuard]
  },
  {
    path: 'create', component: CourseCreateComponent,
    canDeactivate: [DirtyFormGuard]
  },
  {
    path: ':id', component: CourseItemComponent,
    resolve: { course: CourseOverviewResolver },
    canDeactivate: [DirtyFormGuard]
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
  providers: [CourseOverviewResolver, DirtyFormGuard]
})
export class CoursesRoutingModule { }
