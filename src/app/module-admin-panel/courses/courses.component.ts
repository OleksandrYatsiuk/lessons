import { Observable } from 'rxjs';
import { NotificationsService } from '../../core/services/notifications.service';
import { DeleteComponent } from '../../module-shared/components/dialogs/delete/delete.component';
import { Course, ECourseStatus } from '../../core/interfaces/courses';
import { Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectItems } from 'src/app/core/interfaces/select';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { tap } from 'rxjs/operators';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],

})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  courseStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Опубліковано' },
    { value: ECourseStatus.DRAFT, label: 'Чорновик' }];
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'delete'];


  constructor(
    private http: CourseDataService,
    private notify: NotificationsService,
    private loadService: PreloaderService,
    private _cs: ConfirmService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  openDialog(course: Course): void {
    this._cs.delete().subscribe(isDelete => {
      if (isDelete) {
        this._queryDeleteCourse(course)
          .subscribe(() => {
            this.getList();
            this.notify.openSuccess(`Курс "${course.name}" був видалений успішно!`);
          }, error => {
            console.error(error);
          });
      }
    });

  }

  public getList(): void {
    this.courses$ = this._queryCoursesList();
  }

  private _queryDeleteCourse(course: Course): Observable<any> {
    return this.http.delete(course.id);
  }
  private _queryCoursesList(): Observable<Course[]> {
    this.loadService.start();
    return this.http.getCourses().pipe(tap(() => this.loadService.stop()));
  }
}
