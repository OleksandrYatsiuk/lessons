import { Observable } from 'rxjs';
import { Lesson } from './../../../core/interfaces/courses';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.scss']
})
export class LessonsFormComponent implements OnInit {
  @Input() lesson: Lesson;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private http: LessonsDataService) { }

  ngOnInit(): void {
    this.initForm();

    if (this.lesson) {
      this.setValuesToForm()
    }

  }


  public createLesson(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.lesson) {
        this._queryUpdate(this.lesson.id, this.form.value)
          .subscribe(result => console.log(result));
      } else {
        this._queryCreate(this.form.value)
          .subscribe(result => console.log(result));
      }
    }
  }


  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      context: [''],
      file: [''],
      status: [0],
      courseId: [null]
    })
  }

  setValuesToForm() {
    this.form.setValue({
      name: this.lesson.name,
      context: this.lesson.context,
      file: this.lesson.file,
      status: this.lesson.status,
      courseId: this.lesson.courseId
    })
  }


  private _queryUpdate(id: Lesson['id'], lesson: Lesson): Observable<Lesson> {
    return this.http.update(id, lesson);
  }
  private _queryCreate(lesson: Lesson): Observable<Lesson> {
    return this.http.create(lesson);
  }
}
