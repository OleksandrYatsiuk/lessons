import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/core/interfaces/courses';
import { IStudyProgress, EStudyProgress } from 'src/app/core/interfaces/study-progress';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { StudyProgressService } from 'src/app/core/services/study-progress.service';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProgressComponent implements OnInit {
  selectedCourse: string;
  userId: string;
  studyProgressList$: Observable<IStudyProgress[]>;
  coursesList$: Observable<Course[]>;
  cols: { field: string; header: string }[];
  progress = [
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
    private _ms: MessageService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.studyProgressList$ = this._queryProgress();
    this.coursesList$ = this._queryCourseList();

    this.cols = [
      { field: 'lessonId', header: 'Заняття' },
      { field: 'isAnswered', header: 'Переписка' },
      { field: 'progress', header: 'Прогрес' },
      { field: 'status', header: 'Доступність' },
      { field: 'createdAt', header: 'Створено' },
      { field: 'courseId', header: 'Назва курсу' }
    ];
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
        this._ms.add({ severity: 'success', detail: `Оновлено статус заняття для користувача` });
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
        this._ms.add({ severity: 'success', detail: `Оновлено статус заняття для користувача` });
      });
  }

  private _queryProgress(params?: any): Observable<IStudyProgress[]> {
    return this.studyService.queryProgress(this.userId, params);
  }
  private _queryUpdate(progressId: IStudyProgress['_id'], data: Partial<IStudyProgress>): Observable<IStudyProgress> {
    return this.studyService.queryUpdateProgress({ _id: progressId }, data);
  }

  private _queryCourseList(): Observable<Course[]> {
    return this.courseService.getCourses();
  }
}
