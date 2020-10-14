import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { CourseProgramComponent } from './course-program/course-program.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseResultsComponent } from './course-results/course-results.component';
import { CoursePriceComponent } from './course-price/course-price.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    AboutUsComponent,
    CourseProgramComponent,
    CourseDetailsComponent,
    CourseResultsComponent,
    CoursePriceComponent,
    QuestionComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
