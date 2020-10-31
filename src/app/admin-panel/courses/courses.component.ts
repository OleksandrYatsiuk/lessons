import { DeleteComponent } from './../../shared/components/dialogs/delete/delete.component';
import { Course } from './../../core/interfaces/courses';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses = [];
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'delete'];
  constructor(private http: CourseDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }

  private config: MatDialogConfig = {
    position: {
      top: '20px'
    },
    autoFocus: false
  }

  openDialog(course: Course): void {
    const dialogRef = this.dialog.open(DeleteComponent, { data: `курс "${course.name}"`, ...this.config });
    dialogRef.beforeClosed()
      .subscribe(result => {
        if (result) {
          this.delete(course);
        }
      })
  }

  public getList(): void {
    this.http.getCourses().subscribe(courses => this.courses = courses)
  }

  public delete(course: Course): void {
    this.http.delete(course.id).subscribe(courses => {
    })
  }
}
