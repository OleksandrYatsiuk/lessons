import { NotificationsService } from './../../../core/services/notifications.service';
import { IStudyProgress, EStudyStatus, EStudyProgress } from './../../../core/interfaces/study-progress';
import { Observable } from 'rxjs';
import { StudyProgressService } from './../../../core/services/study-progress.service';
import { User } from './../users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Lesson } from 'src/app/core/interfaces/courses';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public userProgress = 0;
  public statuses = [
    {
      label: 'Enabled', value: EStudyStatus.ENABLED
    },
    {
      label: 'Disabled', value: EStudyStatus.DISABLED
    }];

  public progress = [
    {
      label: 'Not Started', value: EStudyProgress.NOT_STARTED
    },
    {
      label: 'Started', value: EStudyProgress.STARTED
    },
    {
      label: 'In progress', value: EStudyProgress.IN_PROGRESS
    },
    {
      label: 'Completed', value: EStudyProgress.COMPLETED
    }
  ];

  step = 0;
  selectedCourse: string;
  studyProgressList$: Observable<IStudyProgress[]>;
  coursesList$: Observable<IStudyProgress[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _studyService: StudyProgressService,
    private notify: NotificationsService) {
    this.user = this.route.snapshot.data.user;
  }

  displayedColumns: string[] = ['lesson', 'createdAt', 'progress', 'status', 'isAnswered', 'course'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.studyProgressList$ = this._queryProgress();
    this.coursesList$ = this._queryProgress();
  }


  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  filter(courseId: IStudyProgress['courseId']): void {
    this.studyProgressList$ = this._queryProgress({ params: { courseId } });
  }

  updateStatus(progress: IStudyProgress, status: EStudyStatus): void {
    this._queryUpdate(progress._id, { status })
      .subscribe(result => {
        this.notify.openSuccess('Lesson status was updated successfully!');
      });
  }

  openChat(lesson: Lesson): void {
    this.router.navigate(['/admin/messages', { userId: this.user.id, lessonId: lesson._id }]);

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

  _queryProgress(params?: any): Observable<IStudyProgress[]> {
    return this._studyService.queryProgress(this.user.id, params).pipe(
      map((arr: IStudyProgress[]) => {
        this._calculateUserProgress(arr);
        return arr;
      }));
  }
  _queryUpdate(progressId: IStudyProgress['_id'], data: Partial<IStudyProgress>): Observable<IStudyProgress> {
    return this._studyService.queryUpdateProgress(progressId, data);
  }
  _calculateUserProgress(lessons: IStudyProgress[]): void {
    const max = lessons.length;
    const completed = lessons.filter(lesson => lesson.progress === EStudyProgress.COMPLETED).length;
    this.userProgress = completed * 100 / max;
  }

}
