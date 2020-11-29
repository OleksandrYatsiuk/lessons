import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/core/interfaces/courses';
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
    private http: UserDataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  lesson: Lesson;
  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };
  contentAllowed = true;

  ngOnInit(): void {
    this._checkFromLocalStorage();
    this.lesson = this.route.snapshot.data.lesson;
    this.context = this.sanitizer.bypassSecurityTrustHtml(this.lesson.context);

    // this.lesson.file = this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson.file);
  }

  private _checkFromLocalStorage(): void {
    const data = JSON.parse(localStorage.getItem('credentials'));
    if (data) {
      this._queryCodeCheck(data)
        .subscribe(() => {
        }, (e) => {
          localStorage.removeItem('credentials');
          this.openDialog();
        });
    } else {
      this.openDialog();
    }
  }

  private openDialog(): void {
    this.contentAllowed = false;
    const dialog = this.dialog.open(ConfirmModalComponent,
      { data: 'Введіть номер телефону профіля з Телеграму', ...this.config });

    dialog.afterClosed().subscribe(res => {
      this.contentAllowed = true;
      console.log(res);
    });
  }

  private _queryCodeCheck(data: { phone: string, code: number }): Observable<boolean> {
    return this.http.checkCode(data);
  }

  public sanitizeLink(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  public sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
