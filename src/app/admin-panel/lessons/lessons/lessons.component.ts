import { NotificationsService } from './../../../core/services/notifications.service';
import { ECourseStatus, Lesson } from './../../../core/interfaces/courses';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { DeleteComponent } from 'src/app/shared/components/dialogs/delete/delete.component';
import { SelectItems } from 'src/app/core/interfaces/select';
import { Observable } from 'rxjs';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { finalize } from 'rxjs/operators';

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
    private _notify: NotificationsService,
    private loadService: PreloaderService) { }

  ngOnInit(): void {
    this.showLessonsList();
  }

  updatePrice(free: boolean, id: Lesson['id']): void {
    this._queryUpdateLessonPrice(id, free)
      .subscribe(lesson => {
        this.showLessonsList();
        this._notify.openSuccess(`Урок "${lesson.name}" був оновлений успішно!`);
      });
  }

  openDialog(lesson: Lesson): void {
    const dialogRef = this.dialog.open(DeleteComponent, { data: { content: `урок "${lesson.name}"`, loading: false }, ...this.config });
    const dialog = dialogRef.componentInstance;
    dialog.omSubmit.subscribe(() => {
      dialog.data.loading = true;
      this._queryDeleteLesson(lesson.id)
        .subscribe(response => {
          dialog.data.loading = false;
          this.showLessonsList();
          this._notify.openSuccess(`Урок "${lesson.name}" був видалений успішно!`);
          dialogRef.close();
        }, error => {
          console.error(error);
        });
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
  private _queryUpdateLessonPrice(id: Lesson['id'], free: boolean): Observable<Lesson> {
    return this.http.update(id, { free });
  }
}
