import { SharedModule } from 'src/app/module-shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './course-form/course-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { DirtyFormGuard } from 'src/app/module-shared/guards/dirty-form.guard';
import { CourseOverviewResolver } from './course-overview.resolver';

const routes: Routes = [
  { path: '', component: CoursesComponent, canDeactivate: [DirtyFormGuard] },
  {
    path: 'create', component: CourseFormComponent,
    canDeactivate: [DirtyFormGuard]
  },
  {
    path: ':id', component: CourseFormComponent,
    resolve: { course: CourseOverviewResolver },
    canDeactivate: [DirtyFormGuard]
  },
];


@NgModule({
  declarations: [
    CourseFormComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [CourseOverviewResolver, DirtyFormGuard]
})
export class CoursesModule { }
