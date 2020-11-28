import { ActivatedRoute } from '@angular/router';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { CustomMessage } from './message.interface';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/core/services/messages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { Course, Lesson } from 'src/app/core/interfaces/courses';
import { MatSelectChange } from '@angular/material/select';
import { SelectItems } from 'src/app/core/interfaces/select';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { User } from '../users/users.component';
import { PreloaderService } from 'src/app/core/services/preloader.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public file: any;
  public text: string;

  public isCourseSelected = false;
  usersList$: Observable<SelectItems[]>;
  coursesList$: Observable<SelectItems[]>;
  lessonsList$: Observable<SelectItems[]>;
  user: User;
  form: FormGroup;
  messages: CustomMessage[];
  loading = false;
  constructor(
    private http: MessagesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http2: UserDataService,
    private courseService: CourseDataService,
    private lessonService: LessonsDataService) {
    this.messages = this.route.snapshot.data.chat;
  }



  ngOnInit(): void {

    this.initForm();
    if (this.route.snapshot.queryParams.chat_id) {
      this.form.setValue(this.route.snapshot.queryParams);
    }
    this.usersList$ = this.getUsers();
    this.coursesList$ = this.getCourses();
    this.getUsers();
  }

  onChange({ value }: { value: string }): void {
    this.http2.getItem({ _id: value }).subscribe(user => this.user = user);
  }

  public getUsers(): Observable<SelectItems[]> {
    return this.http2.getList().pipe(map((users: User[]) => {
      return users.map(user => {
        if (user.firstName && user.lastName) {
          return { label: `${user.firstName} ${user.lastName}`, value: user.id };
        } else {
          return { label: `${user.phone}`, value: user.id };
        }
      });
    }));
  }

  public getCourses(): Observable<SelectItems[]> {
    return this.courseService.getCourses().pipe(map((courses: Course[]) => {
      return courses.map(course => ({ label: course.name, value: course.id }));
    }));
  }

  public getLessons(courseId: Course['id']): Observable<SelectItems[]> {
    return this.lessonService.getLessons({ courseId }).pipe(
      map((lessons: Lesson[]) => {
        return lessons.map(lesson => ({ label: lesson.name, value: lesson.id }));
      }));
  }

  public search(): void {
    if (this.form.valid) {
      this.loading = true;
      this._queryMessagesList().subscribe(messages => {
        this.loading = false;
        this.messages = messages;
      });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      lessonId: ['', Validators.required],
    });
  }
  setCourse(select: MatSelectChange): void {
    this.isCourseSelected = true;
    this.lessonsList$ = this.getLessons(select.value);
  }

  fetchSendingMessage(): void {
    this.search();
  }
  onRemove(): void {
    this.search();
  }

  private _queryMessagesList(): Observable<CustomMessage[]> {
    return this.http.getList(this.form.value);
  }
  get userId(): string { return this.form.get('userId').value; }
  get lessonId(): string { return this.form.get('lessonId').value; }
}
