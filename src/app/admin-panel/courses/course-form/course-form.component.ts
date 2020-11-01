import { NotificationsService } from './../../../core/services/notifications.service';
import { EMPTY, Observable } from 'rxjs';
import { CourseDataService } from './../../../core/services/course-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/core/interfaces/courses';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @Input() course: Course;
  @Input() btnName = 'Зберегти';
  loading = false;
  form: FormGroup;
  constructor(private http: CourseDataService, private fb: FormBuilder,
    private _notify: NotificationsService,
    private _router: Router) { }

  ngOnInit(): void {
    this.initForm();

    if (this.course) {
      this.setFormValues();
    }
  }
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
  }

  public save(): void {
    this.form.markAllAsTouched();
    this.loading = true;
    if (this.form.valid) {
      if (this.course) {
        this._queryEditCourse().subscribe(course => {
          this.loading = false;
          this._notify.openSuccess(`Курс "${course.name}" був успішно оновлений!`);
          this._router.navigate([`/admin/courses`]);
        });
      } else {
        this._queryCreateCourse().subscribe(course => {
          this.loading = false;
          this._notify.openSuccess(`Курс "${course.name}" був успішно створений!`);
          this._router.navigate([`/admin/courses`]);
        });
      }
    }
  }
  public initForm(): void {
    this.form = this.fb.group({
      name: ['', []],
      status: [0, []],
      description: ['', []]
    })
  }

  private setFormValues(): void {
    this.form.setValue({
      name: this.course.name,
      status: this.course.status,
      description: this.course.description
    })
  }

  private _queryEditCourse(): Observable<Course> {
    return this.http.editCourse(this.course.id, this.form.value)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          console.error(error.result);
          return EMPTY;
        })
      )
  }
  private _queryCreateCourse(): Observable<Course> {
    return this.http.create(this.form.value)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.loading = false;
          console.error(error.result);
          return EMPTY;
        })
      )
  }
}
