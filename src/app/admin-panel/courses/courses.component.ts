import { Observable } from 'rxjs';
import { NotificationsService } from './../../core/services/notifications.service';
import { DeleteComponent } from './../../shared/components/dialogs/delete/delete.component';
import { Course } from './../../core/interfaces/courses';
import { Component, OnInit } from '@angular/core';
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
  constructor(private http: CourseDataService, private dialog: MatDialog,
    private _notify: NotificationsService) { }

  ngOnInit(): void {
    this.getList();
  }

  private config: MatDialogConfig = {
    autoFocus: false
  }

  openDialog(course: Course): void {
    const dialogRef = this.dialog.open(DeleteComponent, { data: { content: `курс "${course.name}`, loading: false }, ...this.config });
    const dialog = dialogRef.componentInstance;
    dialog.omSubmit.subscribe(() => {
      dialog.data.loading = true;
      this._queryDeleteCourse(course)
        .subscribe(() => {
          dialog.data.loading = false;
          dialogRef.close();
          this.getList();
          this._notify.openSuccess(`Курс "${course.name}" був вилалений успішно!`);
        }, error => {
          dialog.data.loading = false;
          console.error(error);
        });
    });
  }

  public getList(): void {
    this.http.getCourses().subscribe(courses => this.courses = courses);
  }

  private _queryDeleteCourse(course: Course): Observable<any> {
    return this.http.delete(course.id);
  }
}
