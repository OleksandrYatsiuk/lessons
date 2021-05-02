import { Observable } from 'rxjs';
import { Course, ECourseStatus } from '../../core/interfaces/courses';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { SelectItems } from 'src/app/core/interfaces/select';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { finalize } from 'rxjs/operators';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  courseStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Опубліковано' },
    { value: ECourseStatus.DRAFT, label: 'Чорновик' }];


  constructor(
    private http: CourseDataService,
    private _ms: MessageService,
    private _ps: PreloaderService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef
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
            this._ms.add({ severity: 'success', detail: `Курс "${course.name}" був видалений успішно!` });
            this._cd.detectChanges();
          });
      }
    });

  }

  getList(): void {
    this.courses$ = this._queryCoursesList();
    this._cd.detectChanges();
  }

  private _queryDeleteCourse(course: Course): Observable<any> {
    return this.http.delete(course._id);
  }
  private _queryCoursesList(): Observable<Course[]> {
    this._ps.start();
    return this.http.getCourses().pipe(finalize(() => this._ps.stop()));
  }
}
