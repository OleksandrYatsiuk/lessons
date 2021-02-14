import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { User } from 'src/app/admin-panel/users/users.component';
import { Course } from 'src/app/core/interfaces/courses';
import { Payments } from 'src/app/core/interfaces/payments';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { phoneValidator } from 'src/app/core/validators/phone.validator';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private payment: PaymentService,
    private http: UserDataService,
    private route: ActivatedRoute,
    private courseService: CourseDataService,
    public translate: TranslateService
  ) { }
  form: FormGroup;
  price = 0;
  courseList$: Observable<Course[]>;
  coursesList: Course[];
  user: User;
  loading = false;

  ngOnInit(): void {

    this.translate.onLangChange.subscribe((change: any) => {
      this.translate.use(change.lang)
      this.translate.setDefaultLang(change.lang);
      console.log(change);
      // this.cdr.detectChanges();
    })
    this.courseList$ = this._queryCourseList();
    this.initForm();
    this.route
      .queryParams.pipe(
        concatMap(({ chat_id }) => {
          if (chat_id) {
            return this.http.getItem({ chat_id });
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe(user => {
        this.form.patchValue({ ...user, userId: user.id, courseId: this.route.snapshot.queryParams.courseId });
      });
  }
  public initForm(): void {
    this.form = this.fb.group({
      userId: [''],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      courseId: [null, Validators.required],
      phone: ['', [Validators.required, phoneValidator()]]
    });
  }
  onChange({ value }: { value: Course }): void {
    this.price = value.price;
  }
  public pay(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { phone } = this.form.value;
      this.form.value.phone = phone.slice(phone.length - 10);
      this._queryPreparePayment({
        ...this.form.value, phone, amount: this.price,
        result_url: `${environment.apiUrl}/payments`
      })
        .subscribe(link => {
          window.open(link, '_blank');
        });
    }
  }

  private _queryPreparePayment(data: Partial<Payments>): Observable<string> {
    return this.payment.createPayment(data).pipe(
      catchError(e => {
        console.error(e);
        this.loading = false;
        return EMPTY;
      }));
  }
  private _queryCourseList(): Observable<Course[]> {
    return this.courseService.getCourses();
  }
}
