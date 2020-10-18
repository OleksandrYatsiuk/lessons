import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseDataService } from 'src/app/core/services/course-data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses = [];
  public name = new FormControl('', Validators.required)
  constructor(private http: CourseDataService) { }

  ngOnInit(): void {
    this.getList()
  }
  public createCourse(): void {
    this.name.markAllAsTouched();
    if (this.name.valid) {
      this.http.create({ name: this.name.value }).subscribe(result => {
        console.log(result);
        this.getList();
      });

    }
  }
  public getList(): void {
    this.http.getCourses().subscribe(courses => this.courses = courses)
  }
}
