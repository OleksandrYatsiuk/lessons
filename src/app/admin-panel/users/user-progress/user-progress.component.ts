import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Course } from 'src/app/core/interfaces/courses';
import { IStudyProgress, EStudyProgress } from 'src/app/core/interfaces/study-progress';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { StudyProgressService } from 'src/app/core/services/study-progress.service';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit {
  selectedCourse: string;
  userId: string;
  public userProgress = 0;
  studyProgressList$: Observable<IStudyProgress[]>;
  coursesList$: Observable<Course[]>;
  displayedColumns: string[] = ['lesson', 'isAnswered', 'progress', 'status', 'createdAt', 'course'];
  public progress = [
    {
      label: 'Не розпочато', value: EStudyProgress.NOT_STARTED
    },
    {
      label: 'Розпочато', value: EStudyProgress.STARTED
    },
    {
      label: 'В процесі', value: EStudyProgress.IN_PROGRESS
    },
    {
      label: 'Завершено', value: EStudyProgress.COMPLETED
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private studyService: StudyProgressService,
    private courseService: CourseDataService,
    private notify: NotificationsService,
    private dialog: MatDialog,
    private botService: TelegramBotService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.studyProgressList$ = this._queryProgress();
    this.coursesList$ = this._queryCourseList();
  }

  filter(courseId?: Course['id']): void {
    this.selectedCourse = courseId;
    if (courseId) {
      this.studyProgressList$ = this._queryProgress({ params: { courseId } });
    } else {
      this.studyProgressList$ = this._queryProgress();
    }
  }

  uploadCertificate(changes: Event & { target: HTMLInputElement }): void {
    console.log(changes.target.files[0]);
    const dialog = this.dialog.open(ConfirmComponent,
      {
        data: `Ви завантажуєте сертифікат для користувача, що закінчив курс "${this.selectedCourse}".\n Підтвердіть свою дію.`,
        disableClose: true
      });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.botService.sendDocument({
          chat_id: 375462081,
          document: changes.target.files[0],
          caption: 'Вітання'
        }).subscribe(result => console.log(result));
      } else {
        changes.target.value = '';
      }
    });
  }

  updateStatus(progress: IStudyProgress, status: boolean): void {
    this._queryUpdate(progress._id, { status })
      .subscribe(result => {
        this.notify.openSuccess('Lesson status was updated successfully!');
      });
  }

  updateProgress(item: IStudyProgress, progress: EStudyProgress): void {
    this._queryUpdate(item._id, { progress })
      .subscribe(result => {
        if (this.selectedCourse) {
          this.studyProgressList$ = this._queryProgress({ params: { courseId: this.selectedCourse } });
        } else {
          this.studyProgressList$ = this._queryProgress();
        }
        this.notify.openSuccess('Lesson progress was updated successfully!');
      });
  }

  private _queryProgress(params?: any): Observable<IStudyProgress[]> {
    return this.studyService.queryProgress(this.userId, params).pipe(
      map((arr: IStudyProgress[]) => {
        this._calculateUserProgress(arr);
        return arr;
      }));
  }
  private _queryUpdate(progressId: IStudyProgress['_id'], data: Partial<IStudyProgress>): Observable<IStudyProgress> {
    return this.studyService.queryUpdateProgress({ _id: progressId }, data);
  }
  private _calculateUserProgress(lessons: IStudyProgress[]): void {
    const max = lessons.length;
    const completed = lessons.filter(lesson => lesson.progress === EStudyProgress.COMPLETED).length;
    this.userProgress = completed * 100 / max;
  }

  private _queryCourseList(): Observable<Course[]> {
    return this.courseService.getCourses();
  }
}
