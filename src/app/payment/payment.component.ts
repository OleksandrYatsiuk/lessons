import { environment } from './../../environments/environment.prod';
import { Payments } from './../core/interfaces/payments';
import { EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/admin-panel/users/users.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../core/services/payment.service';
import { UserDataService } from '../core/services/user-data.service';
import { catchError, map } from 'rxjs/operators';
import { CourseDataService } from '../core/services/course-data.service';
import { Course } from '../core/interfaces/courses';
import { SelectItems } from '../core/interfaces/select';
import { phoneValidator } from '../core/validators/phone.validator';

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
    private courseService: CourseDataService
  ) { }
  form: FormGroup;
  price = 0;
  courseList$: Observable<SelectItems[]>;
  coursesList: Course[];
  user: User;
  loading = false;

  ngOnInit(): void {
    this.courseList$ = this._queryCourseList();
    this.initForm();
    this.route
      .queryParams
      .subscribe(({ chat_id }) => {
        if (chat_id) {
          this.http.getItem({ chat_id })
            .subscribe(user => this.form.patchValue(user));
        }
      });
  }
  public initForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      course_id: [null, Validators.required],
      phone: ['', [Validators.required, phoneValidator()]]
    });
  }
  onChange(id: string): void {
    const course = this.coursesList.find(el => el.id === id);
    this.price = course.price;
  }
  public pay(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = true;
      this.loading = false;
      const orderId = Date.now();
      const { phone } = this.form.value;
      this.form.value.phone = phone.slice(phone.length - 10);
      this._queryPreparePayment({
        ...this.form.value, phone, amount: this.price, description: 'Order # ' + orderId,
        order_id: orderId,
        result_url: `${environment.apiUrl}/payments/${orderId}`
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
  private _queryCourseList(): Observable<SelectItems[]> {
    return this.courseService.getCourses().pipe(

      map(courses => {
        this.coursesList = courses;
        const data = courses.map(({ name, id }) => ({ label: name, value: id }));
        data.unshift({ label: 'Вибрати курс', value: null });
        return data;
      })
    );
  }
}
