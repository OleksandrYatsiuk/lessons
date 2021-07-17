import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { EMPTY, Observable } from 'rxjs';
import { Lesson, Course, ECourseStatus } from '../../../core/interfaces/courses';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { catchError, map } from 'rxjs/operators';
import { SelectItems } from 'src/app/core/interfaces/select';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.scss']
})
export class LessonsFormComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() btnName = 'Зберегти';
  @Output() dirty = new EventEmitter<boolean>();
  form: FormGroup;
  loading = false;
  coursesList$: Observable<SelectItems[]>;

  lessonStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Опубліковано' },
    { value: ECourseStatus.DRAFT, label: 'Чорновик' }];

  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    placeholder: 'Ввести опис...',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'center',
        class: 'center',
        tag: 'div'
      },
    ],
    toolbarPosition: 'top',
  };
  constructor(
    private fb: FormBuilder,
    private http: LessonsDataService,
    private courseService: CourseDataService,
    private errorHandler: ErrorHandlerService,
    private _ms: MessageService,
    private router: Router) { }


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
        this._queryUpdate(this.lesson._id, this.form.value)
          .subscribe(lesson => {
            this.loading = false;
            this._ms.add({ severity: 'success', detail: `Урок "${lesson.name}" був успішно оновлений!` });
            this.router.navigate([`/admin/courses/${lesson.courseId}`]);
          });
      } else {
        this._queryCreate(this.form.value)
          .subscribe(lesson => {
            this.loading = false;
            this._ms.add({ severity: 'success', detail: `Урок "${lesson.name}" був успішно створений!` });
            this.router.navigate([`/admin/courses/${lesson.courseId}`]);
          });
      }
    }
  }


  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      context: ['', []],
      // video: ['', []],
      // presentation: ['', []],
      // file: ['', []],
      status: [1, [Validators.required]],
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
          this.errorHandler.validation(error, this.form);
          return EMPTY;
        })
      );
  }

  private _queryCreate(lesson: Lesson): Observable<Lesson> {
    return this.http.create(lesson)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler.validation(error, this.form);
          return EMPTY;
        })
      );
  }
  private _queryCourseList(): Observable<SelectItems[]> {
    return this.courseService.getCourses().pipe(
      map((courses: Course[]) =>
        courses.map(course => ({ label: course.name, value: course._id }))
      )
    );
  }

  get context(): AbstractControl {
    return this.form.get('context');
  }
}
