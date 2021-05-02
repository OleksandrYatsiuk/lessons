import { EMPTY, Observable } from 'rxjs';
import { CourseDataService } from '../../../core/services/course-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, ECourseStatus } from 'src/app/core/interfaces/courses';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItems } from 'src/app/core/interfaces/select';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MessageService } from 'primeng/api';
import { ComponentCanDeactivate } from 'src/app/module-shared/guards/dirty-form.guard';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, ComponentCanDeactivate {
  @Input() course: Course;
  @Input() btnName = 'Зберегти';
  @Output() dirty = new EventEmitter<boolean>();
  loading = false;
  form: FormGroup;
  courseStatuses: SelectItems[] = [
    { value: ECourseStatus.PUBLISHED, label: 'Опубліковано' },
    { value: ECourseStatus.DRAFT, label: 'Чорновик' }];
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
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
  };
  constructor(
    private http: CourseDataService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private _ms: MessageService,
    private router: Router,
    private _cs: ConfirmService,
    private _route: ActivatedRoute
  ) { }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.form.dirty) {
      return this._cs.confirm();
    }
    return true;
  }

  ngOnInit(): void {
    this.course = this._route.snapshot.data.course;
    this.initForm();
    this.form.valueChanges.subscribe(() => this.dirty.emit(this.form.dirty));

    if (this.course) {
      this.setFormValues();
    }
  }

  public save(): void {
    this.form.markAllAsTouched();
    this.form.markAsPristine();
    this.dirty.emit(false);
    if (this.form.valid) {
      this.loading = true;
      if (this.course) {
        this._queryEditCourse().subscribe(course => {
          this.loading = false;
          this.form.markAsPristine();
          this._ms.add({ severity: 'success', detail: `Курс "${course.name}" був успішно оновлений!` });
          this.router.navigate([`/admin/courses`]);
        });
      } else {
        this._queryCreateCourse().subscribe(course => {
          this.loading = false;
          this.form.markAsPristine();
          this._ms.add({ severity: 'success', detail: `Курс "${course.name}" був успішно створений!` });
          this.router.navigate([`/admin/courses`]);
        });
      }
    }
  }
  public initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      status: [ECourseStatus.DRAFT, [Validators.required]],
      description: ['', []],
      price: [0, [Validators.min(0)]]
    });
  }

  private setFormValues(): void {
    this.form.setValue({
      name: this.course.name,
      status: this.course.status,
      description: this.course.description,
      price: this.course.price
    });
  }

  private _queryEditCourse(): Observable<Course> {
    return this.http.editCourse(this.course._id, this.form.value)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler.validation(error, this.form);
          return EMPTY;
        })
      );
  }
  private _queryCreateCourse(): Observable<Course> {
    return this.http.create(this.form.value)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          this.errorHandler.validation(error, this.form);
          return EMPTY;
        })
      );
  }
}
