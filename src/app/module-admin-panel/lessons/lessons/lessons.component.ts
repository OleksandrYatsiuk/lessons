import { NotificationsService } from '../../../core/services/notifications.service';
import { ECourseStatus, Lesson } from '../../../core/interfaces/courses';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { DeleteComponent } from 'src/app/module-shared/components/dialogs/delete/delete.component';
import { SelectItems } from 'src/app/core/interfaces/select';
import { Observable } from 'rxjs';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { finalize } from 'rxjs/operators';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {

  @Input() courseId: Lesson['courseId'];
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'free', 'delete'];

  lessons$: Observable<Lesson[]>;
  price;
  lessonStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Опубліковано' },
    { value: ECourseStatus.DRAFT, label: 'Чорновик' }];

  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true,
  };

  constructor(
    private http: LessonsDataService,
    private dialog: MatDialog,
    private notify: NotificationsService,
    private loadService: PreloaderService,
    private _cs: ConfirmService) { }

  ngOnInit(): void {
    this.showLessonsList();
  }

  updatePrice(free: boolean, lesson: Lesson): void {
    this._queryUpdateLessonPrice(lesson.id, { name: lesson.name, free, status: lesson.status })
      .subscribe(({ name }) => {
        this.showLessonsList();
        this.notify.openSuccess(`Урок "${name}" був оновлений успішно!`);
      });
  }

  openDialog(lesson: Lesson): void {
    this._cs.delete().subscribe(isDelete => {
      if (isDelete) {
        this._queryDeleteLesson(lesson.id)
          .subscribe(response => {
            this.showLessonsList();
            this.notify.openSuccess(`Урок "${lesson.name}" був видалений успішно!`);
          }, error => {
            console.error(error);
          });
      }
    });
  }

  private showLessonsList(): void {
    this.lessons$ = this._queryLessonsList();
  }

  private _queryLessonsList(): Observable<Lesson[]> {
    this.loadService.start();
    let body = null;
    if (this.courseId) {
      body = { courseId: this.courseId };
    }
    return this.http.getLessons(body).pipe(finalize(() => this.loadService.stop()));
  }
  private _queryDeleteLesson(id: Lesson['id']): Observable<any> {
    return this.http.delete(id);
  }
  private _queryUpdateLessonPrice(id: string, body: Partial<Lesson>): Observable<Lesson> {
    return this.http.update(id, body);
  }
}
