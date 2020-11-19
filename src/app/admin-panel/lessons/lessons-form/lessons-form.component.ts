import { NotificationsService } from './../../../core/services/notifications.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { EMPTY, Observable } from 'rxjs';
import { Lesson, Course, ECourseStatus } from './../../../core/interfaces/courses';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { catchError, map } from 'rxjs/operators';
import { SelectItems } from 'src/app/core/interfaces/select';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.scss']
})
export class LessonsFormComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() btnName = 'Зберегти';
  @Output() dirty = new EventEmitter<boolean>();
  public form: FormGroup;
  loading = false;
  coursesList$: Observable<SelectItems[]>;

  constructor(
    private fb: FormBuilder,
    private http: LessonsDataService,
    private _courseService: CourseDataService,
    private _notify: NotificationsService,
    private router: Router) { }

  lessonStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Published' },
    { value: ECourseStatus.DRAFT, label: 'Draft' }];

  editorConfig: AngularEditorConfig = {
    editable: true,

    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    placeholder: 'Enter text here...',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'video',
        class: 'custom-video',
        tag: 'div'
      },
      {
        name: 'center',
        class: 'center',
        tag: 'div'
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
  };

  ngOnInit(): void {
    this.coursesList$ = this._queryCourseList();
    this.initForm();
    if (this.lesson) {
      this.setValuesToForm();
    }
    this.form.valueChanges.subscribe(() => this.dirty.emit(this.form.dirty));
  }

  public save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = true;
      if (this.lesson) {
        this._queryUpdate(this.lesson.id, this.form.value)
          .subscribe(lesson => {
            this.loading = false;
            this._notify.openSuccess(`Урок "${lesson.name}" був успішно оновлений!`);
            this.router.navigate([`/admin/courses/${lesson.courseId}`]);
          });
      } else {
        this._queryCreate(this.form.value)
          .subscribe(lesson => {
            this.loading = false;
            this._notify.openSuccess(`Урок "${lesson.name}" був успішно створений!`);
            this.router.navigate([`/admin/courses/${lesson.courseId}`]);
          });
      }
    }
  }


  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      context: ['', []],
      file: ['', []],
      status: [0, [Validators.required]],
      courseId: [null, [Validators.required]],
      free: [false, [Validators.required]]
    });
  }

  setValuesToForm(): void {
    this.form.patchValue(this.lesson);
  }


  private _queryUpdate(id: Lesson['id'], lesson: Lesson): Observable<Lesson> {
    return this.http.update(id, lesson)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          console.error(error.result);
          return EMPTY;
        })
      );
  }

  private _queryCreate(lesson: Lesson): Observable<Lesson> {
    return this.http.create(lesson)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          console.error(error.result);
          return EMPTY;
        })
      );
  }
  private _queryCourseList(): Observable<SelectItems[]> {
    return this._courseService.getCourses().pipe(
      map((courses: Course[]) =>
        courses.map(course => ({ label: course.name, value: course.id }))
      )
    );
  }

  get context() {
    return this.form.get('context');
  }
}
