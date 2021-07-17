import { SharedModule } from 'src/app/module-shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonsFormComponent } from './lessons-form/lessons-form.component';
import { LessonCreateComponent } from './lesson-create/lesson-create.component';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [LessonItemComponent, LessonsComponent, LessonsFormComponent, LessonCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    LessonsRoutingModule
  ],
  exports: [LessonsComponent]
})
export class LessonsModule { }
