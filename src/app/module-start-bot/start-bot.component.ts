import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../module-admin-panel/users/users.component';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { UserDataService } from '../core/services/user-data.service';
import { phoneValidator } from '../core/validators/phone.validator';

@Component({
  selector: 'app-start-bot',
  templateUrl: './start-bot.component.html',
  styleUrls: ['./start-bot.component.scss']
})
export class StartBotComponent implements OnInit {

  phone = new FormControl('', [Validators.required, phoneValidator()]);

  constructor(
    private http: UserDataService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  openTelegram(): void {
    this.phone.markAllAsTouched();
    if (this.phone.valid) {
      const phone = this.phone.value;
      this._queryRegisterUser({ phone: phone.slice(phone.length - 10) })
        .subscribe(user => {
          window.open(`https://t.me/practical_lagacy_courses_bot?start=${user.phone}`);
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
