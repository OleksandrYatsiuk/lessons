import { NotificationsService } from './../../../core/services/notifications.service';
import { ECourseStatus, Lesson } from './../../../core/interfaces/courses';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { DeleteComponent } from 'src/app/shared/components/dialogs/delete/delete.component';
import { SelectItems } from 'src/app/core/interfaces/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  @Input() courseId: string;
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
    private _notify: NotificationsService) { }

  ngOnInit(): void {
    this.getList();
  }

  updatePrice(free: boolean, id: Lesson['id']): void {
    this._queryUpdateLessonPrice(id, free)
      .subscribe(lesson => {
        this.getList();
        this._notify.openSuccess(`Урок "${lesson.name}" був оновлений успішно!`);
      });
  }

  private _queryUpdateLessonPrice(id: Lesson['id'], free: boolean): Observable<Lesson> {
    return this.http.update(id, { free });
  }



  public getList(): void {
    let body = null;
    if (this.courseId) {
      body = { courseId: this.courseId };
    }
    this.lessons$ = this.http.getLessons(body);
  }
  public delete(lesson: Lesson): void {
    this.http.delete(lesson.id).subscribe(result => {
      this.getList();
      console.log(result);
    });
  }

  openDialog(lesson: Lesson): void {
    const dialogRef = this.dialog.open(DeleteComponent, { data: { content: `урок "${lesson.name}"`, loading: false }, ...this.config });
    const dialog = dialogRef.componentInstance;
    dialog.omSubmit.subscribe(() => {
      dialog.data.loading = true;
      this.http.delete(lesson.id)
        .subscribe(response => {
          dialog.data.loading = false;
          this.getList();
          this._notify.openSuccess(`Урок "${lesson.name}" був вилалений успішно!`);
          dialogRef.close();
        }, error => {
          console.error(error);
        });
    });
  }

}
