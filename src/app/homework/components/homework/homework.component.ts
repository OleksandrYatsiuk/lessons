import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/admin-panel/users/users.component';
import { Lesson } from 'src/app/core/interfaces/courses';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {
  context: SafeHtml;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private lessonService: LessonsDataService,
    private userService: UserDataService,
    private sanitizer: DomSanitizer) { }

  lesson: Lesson;
  user: User;
  lessonId: Lesson['id'];
  chatId: User['chat_id'];
  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };
  contentAllowed = true;

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.params.id;
    this.chatId = this.route.snapshot.queryParams.chat_id;
    this._checkFromLocalStorage();

    // this.lesson = this.route.snapshot.data.lesson;

  }

  private _checkFromLocalStorage(): void {
    const data = JSON.parse(localStorage.getItem('credentials'));
    if (data) {
      this._queryCodeCheck(data)
        .pipe(
          mergeMap(() => this._queryLessonDetails(this.lessonId)))
        .subscribe((lesson) => {
          console.log(lesson);
          this.lesson = lesson;
        }, (e) => {
          localStorage.removeItem('credentials');
          if (this.chatId) {
            this._queryGetUser(this.chatId).subscribe(user => this.openDialog(user));
          } else {
            this.openDialog();
          }
        });
    } else {
      if (this.chatId) {
        this._queryGetUser(this.chatId).subscribe(user => this.openDialog(user));
      } else {
        this.openDialog();
      }
    }
  }

  private openDialog(user?: User): void {

    this.contentAllowed = false;
    const dialog = this.dialog.open(ConfirmModalComponent,
      { data: { text: 'Введіть номер телефону профіля з Телеграму', user }, ...this.config });

    dialog.afterClosed().subscribe(res => {
      this._queryLessonDetails(this.lessonId).subscribe(lesson => this.lesson = lesson);
      this.contentAllowed = true;
    });
  }

  private _queryCodeCheck(data: { phone: string, code: number }): Observable<boolean> {
    return this.userService.checkCode(data);
  }

  private _queryGetUser(chat_id: number): Observable<User> {
    return this.userService.getItem({ chat_id });
  }
  private _queryLessonDetails(id: string): Observable<Lesson> {
    return this.lessonService.getLesson(id);
  }

  public sanitizeLink(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  public sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
