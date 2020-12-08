import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, pluck, takeUntil } from 'rxjs/operators';
import { ICertificate } from 'src/app/core/interfaces/certificates';
import { Course } from 'src/app/core/interfaces/courses';
import { SelectItems } from 'src/app/core/interfaces/select';
import { CertificateDataService } from 'src/app/core/services/certificate.service';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { User } from '../users/users.component';
import { UploadItemComponent } from './upload-item/upload-item.component';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  courseOptions$: Observable<SelectItems[]>;
  usersOptions$: Observable<SelectItems[]>;
  courses: Course[];
  certificates$: Observable<ICertificate[]>;
  form: FormGroup
  users: User[];
  subscribe$: any
  columns: string[] = ['userId', 'courseId', 'certificate', 'createdAt', 'delete'];
  constructor(
    private userService: UserDataService,
    private courseService: CourseDataService,
    private certificateService: CertificateDataService,
    private telegramService: TelegramBotService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.showCertificatesList();
    this.usersOptions$ = this._queryUserList();
    this.courseOptions$ = this._queryCourseList();
    this._initForm();

  }

  private _initForm(): void {
    this.form = this.fb.group({
      userId: [null, []],
      courseId: [null, []]
    })
  }

  showCertificatesList(data?: Partial<ICertificate>): void {
    this.certificates$ = this._queryCertificatesList(data);
  }
  openDialog(certificate: ICertificate): void {
    console.log(certificate);
  }

  addCertificate(): void {
    const dialog = this.dialog.open(UploadItemComponent, { disableClose: false });
    dialog.afterClosed().pipe(
    ).subscribe(file => {
      if (file) {
        console.log(file);
        takeUntil(this.subscribe$)
        this._querySendCertificate({
          chat_id: 375462081,
          document: file,
          caption: 'Вітання'
        })
          .subscribe((message) => {
            console.log(message)
            this._queryCreateCertificate({
              userId: this.form.value.userId,
              courseId: this.form.value.courseId,
              fileId: message.document.file_id,
            }).subscribe()
          }
          );
      }
    });
  }
  open(link: string): void {
    window.open(link, '_blank')
  }


  private _queryUserList(): Observable<SelectItems[]> {
    return this.userService.getList().pipe(
      map(res => {
        this.users = res;
        return res.map(el => ({ label: `${el.firstName} ${el.lastName}` || el.phone, value: el.id }));
      })
    )
  }
  private _queryCourseList(): Observable<SelectItems[]> {
    return this.courseService.getCourses().pipe(
      map(res => {
        this.courses = res;
        return res.map(el => ({ label: el.name, value: el.id }));
      })
    );
  }

  private _queryCertificatesList(params?: Partial<ICertificate>): Observable<ICertificate[]> {
    return this.certificateService.queryList(params);
  }
  private _queryCreateCertificate(body: Partial<ICertificate>): Observable<ICertificate> {
    return this.certificateService.queryCreate(body);
  }
  private _queryDeleteCertificate(id: ICertificate['id']): Observable<null> {
    return this.certificateService.queryDelete(id);
  }
  private _querySendCertificate(body: any): Observable<any> {
    return this.telegramService.sendDocument(body)
  }

}
