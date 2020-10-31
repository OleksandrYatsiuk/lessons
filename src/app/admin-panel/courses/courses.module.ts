import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { LessonsModule } from '../lessons/lessons.module';


@NgModule({
  declarations: [CourseItemComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    LessonsModule
  ],
})
export class CoursesModule { }
