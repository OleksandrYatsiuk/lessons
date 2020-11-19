import { Observable } from 'rxjs';
import { NotificationsService } from './../../core/services/notifications.service';
import { DeleteComponent } from './../../shared/components/dialogs/delete/delete.component';
import { Course, ECourseStatus } from './../../core/interfaces/courses';
import { Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectItems } from 'src/app/core/interfaces/select';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],

})
export class CoursesComponent implements OnInit {
  public courses$: Observable<Course[]>;
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'delete'];
  private config: MatDialogConfig = {
    autoFocus: false
  };
  courseStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Published' },
    { value: ECourseStatus.DRAFT, label: 'Draft' }];
  constructor(
    private http: CourseDataService,
    private dialog: MatDialog,
    private notify: NotificationsService,
    private loadService: PreloaderService
  ) { }

  ngOnInit(): void {
    this.getList();
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
          this.notify.openSuccess(`Курс "${course.name}" був вилалений успішно!`);
        }, error => {
          dialog.data.loading = false;
          console.error(error);
        });
    });
  }

  public getList(): void {
    this.courses$ = this._queryCoursesList()
  }

  private _queryDeleteCourse(course: Course): Observable<any> {
    return this.http.delete(course.id);
  }
  private _queryCoursesList(): Observable<Course[]> {
    this.loadService.start();
    return this.http.getCourses().pipe(tap(() => this.loadService.stop()));
  }
}
