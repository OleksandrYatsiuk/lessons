/* eslint-disable @typescript-eslint/naming-convention */
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/module-admin-panel/users/users.component';
import { Lesson } from 'src/app/core/interfaces/courses';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {
  context: SafeHtml;
  isBrowser: boolean;
  lesson: Lesson;
  user: User;
  lessonId: Lesson['id'];
  chatId: User['chat_id'];
  contentAllowed = true;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    private lessonService: LessonsDataService,
    private userService: UserDataService,
    private sanitizer: DomSanitizer,
    private _ds: DialogService,
    private storageService: LocalStorageService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }



  ngOnInit(): void {
    this.lessonId = this.route.snapshot.params.id;
    this.chatId = this.route.snapshot.queryParams.chat_id;
    this._checkFromLocalStorage();
  }

  sanitizeLink(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  private _checkFromLocalStorage(): void {

    let data = this.storageService.getFromLocalStorage('credentials');
    if (data) {
      data = JSON.parse(data);
      this._queryCodeCheck(data)
        .pipe(
          mergeMap(() => this._queryLessonDetails(this.lessonId, { phone: data.phone }))
        )
        .subscribe((lesson) => {
          this.lesson = lesson;
        }, (e) => {
          this.storageService.removeKeyFromStorage('credentials');
          this.openModal();
        });
    } else {
      this.openModal();
    }
  }

  private openModal(): void {
    if (this.chatId) {
      this._queryGetUser(this.chatId).subscribe(user => this.openDialog(user));
    } else {
      this.openDialog();
    }
  }

  private openDialog(user?: User): void {
    if (this.isBrowser) {
      this.contentAllowed = false;

      const ref = this._ds.open(ConfirmModalComponent, {
        data: { text: 'Введіть номер телефону профіля з Телеграму', user },
        styleClass: 'plc-dynamic-dialog',
        header: 'Підтвердження профіля'
      });

      ref.onClose.subscribe(res => {
        if (res) {
          this.contentAllowed = false;
        }
      });
    }



  }

  private _queryCodeCheck(data: { phone: string; code: number }): Observable<boolean> {
    return this.userService.checkCode({ ...data, phone: data.phone.replace(/[^0-9]/g, '') });
  }

  // tslint:disable-next-line:variable-name
  private _queryGetUser(chat_id: number): Observable<User> {
    return this.userService.getItem({ chat_id });
  }
  private _queryLessonDetails(id: string, params?: Partial<User>): Observable<Lesson> {
    return this.lessonService.getLesson(id, params);
  }

}
