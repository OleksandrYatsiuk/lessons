import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/core/interfaces/courses';
import { IStudyProgress, EStudyProgress } from 'src/app/core/interfaces/study-progress';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { StudyProgressService } from 'src/app/core/services/study-progress.service';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';

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

  filter({ value }: { value: Course['id'] }): void {
    this.selectedCourse = value;
    if (value) {
      this.studyProgressList$ = this._queryProgress({ params: { courseId: value } });
    } else {
      this.studyProgressList$ = this._queryProgress();
    }
  }

  updateStatus(progress: IStudyProgress, { checked }: { checked: boolean }): void {
    this._queryUpdate(progress._id, { status: checked })
      .subscribe(result => {
        this.notify.openSuccess('Оновлено статус заняття для користувача');
      });
  }

  updateProgress(item: IStudyProgress, { value }: { value: EStudyProgress }): void {
    this._queryUpdate(item._id, { progress: value })
      .subscribe(result => {
        if (this.selectedCourse) {
          this.studyProgressList$ = this._queryProgress({ params: { courseId: this.selectedCourse } });
        } else {
          this.studyProgressList$ = this._queryProgress();
        }
        this.notify.openSuccess('Оновлено статус заняття для користувача');
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
