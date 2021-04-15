import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { ICertificate } from 'src/app/core/interfaces/certificates';
import { Course } from 'src/app/core/interfaces/courses';
import { SelectItems } from 'src/app/core/interfaces/select';
import { CertificateDataService } from 'src/app/core/services/certificate.service';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';
import { CourseDataService } from 'src/app/core/services/course-data.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { DeleteComponent } from 'src/app/module-shared/components/dialogs/delete/delete.component';
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
  form: FormGroup;
  users: User[];
  selectedUser: User;
  selectedCourse: Course;
  columns: string[] = ['userId', 'courseId', 'certificate', 'createdAt', 'delete'];
  constructor(
    private userService: UserDataService,
    private courseService: CourseDataService,
    private certificateService: CertificateDataService,
    private telegramService: TelegramBotService,
    private notify: NotificationsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _cs: ConfirmService
  ) { }

  ngOnInit(): void {
    this.showCertificatesList();
    this.usersOptions$ = this._queryUserList();
    this.courseOptions$ = this._queryCourseList();
    this._initForm();

  }
  showCertificatesList(data?: Partial<ICertificate>): void {
    this.certificates$ = this._queryCertificatesList(data);
  }
  openDialog(certificate: ICertificate): void {
    this._cs.delete().subscribe(isDelete => {
      if (isDelete) {
        this._queryDeleteCertificate(certificate.id)
          .subscribe(() => {
            this.showCertificatesList();
            this.notify.openSuccess(`Cертифікат був видалений успішно!`);
          }, ({ error }: HttpErrorResponse) => {
            this.notify.openError(error.result);
          });
      }
    });

  }

  addCertificate(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const dialog = this.dialog.open(UploadItemComponent, { disableClose: false });
      dialog.afterClosed()
        .pipe(
          mergeMap(file => {
            if (file) {
              return this._querySendCertificate({
                chat_id: 375462081,
                document: file,
                caption: 'Вітання'
              });
            } else {
              return EMPTY;
            }
          }),
          concatMap(message => this._queryCreateCertificate({
            ...this.form.value,
            fileId: message.document.file_id,
          }))
        ).subscribe(() => {
          this.showCertificatesList();
        });
    }

  }

  open(link: string): void {
    window.open(link, '_blank');
  }

  refreshFileLink(element: ICertificate): void {
    this._queryUpdateCertificate(element.id, element.fileId)
      .subscribe(result => {
        this.showCertificatesList();
      });
  }

  private _initForm(): void {
    this.form = this.fb.group({
      userId: [null, [Validators.required]],
      courseId: [null, [Validators.required]]
    });
  }


  private _queryUserList(): Observable<SelectItems[]> {
    return this.userService.getList().pipe(
      map(res => {
        this.users = res;
        return res.map(el => ({ label: `${el.firstName} ${el.lastName}` || el.phone, value: el.id }));
      })
    );
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
  private _queryUpdateCertificate(id: ICertificate['id'], fileId: ICertificate['fileId']): Observable<ICertificate> {
    return this.certificateService.queryRefresh(id, fileId);
  }
  private _querySendCertificate(body: any): Observable<any> {
    return this.telegramService.sendDocument(body);
  }

}
