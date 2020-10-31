import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { LessonsModule } from '../lessons/lessons.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseCreateComponent } from './course-create/course-create.component';


@NgModule({
  declarations: [CourseItemComponent, CourseFormComponent, CourseCreateComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    LessonsModule,
    SharedModule
  ],
})
export class CoursesModule { }
