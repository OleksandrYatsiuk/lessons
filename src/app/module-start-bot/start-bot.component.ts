import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../module-admin-panel/users/users.component';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { UserDataService } from '../core/services/user-data.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-start-bot',
  templateUrl: './start-bot.component.html',
  styleUrls: ['./start-bot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartBotComponent implements OnInit {

  phone = new FormControl('', [Validators.required]);
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: UserDataService,
    private errorHandler: ErrorHandlerService,
    private _cd: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  openTelegram(): void {
    this.phone.markAllAsTouched();
    if (this.phone.valid) {
      const phone = this.phone.value.replace(/[^0-9]/g, '');
      this._queryRegisterUser({ phone })
        .subscribe(user => {
          window.open(`https://t.me/practical_lagacy_courses_bot?start=${phone}`);
          this._cd.detectChanges();
        });
    }
  }

  private _queryRegisterUser(user: Partial<User>): Observable<User> {
    return this.http.register(user).pipe(
      catchError(({ error }: HttpErrorResponse) => {
        this.errorHandler.validation(error, this.phone);
        return EMPTY;
      })
    );
  }
}
