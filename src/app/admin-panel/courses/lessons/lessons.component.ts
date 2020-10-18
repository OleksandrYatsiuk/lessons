import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  @Input() courseId: string;
  public form: FormGroup;
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'delete'];
  public lessons = [];
  constructor(private http: LessonsDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getList();
    this.initForm();
  }
  public createLesson(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.http.create(this.form.value).subscribe(result => {
        console.log(result)
        this.getList();
      });

    }
  }
  public getList(): void {
    this.http.getLessons({ params: { courseId: this.courseId } }).subscribe(lessons => this.lessons = lessons)
  }
  public delete(id: string) {
    this.http.delete(id).subscribe(result => {
      this.getList();
      console.log(result)
    });
  }
  public initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      context: [''],
      file: [''],
      status: [0],
      courseId: [this.courseId]
    })
  }
}
