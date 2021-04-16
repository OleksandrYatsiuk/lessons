import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: FormBuilder,
    private http: UserDataService,
    private errorHandler: ErrorHandlerService,
    private storage: LocalStorageService,
    private _ref: DynamicDialogRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initForm();
  }


  login(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._queryUserLogin().subscribe(({ token }) => {
        this.storage.writeToLocalStorage('plc_token', token);
        this._ref.close(true);
      });
    }
  }


  private initForm(): void {
    this.form = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  private _queryUserLogin(): Observable<{ token: string }> {
    this.loading = true;
    return this.http.login({
      ...this.form.value, phone: this.form.value.phone.replace(/[^0-9]/g, '')
    }).pipe(
      catchError(({ error }: HttpErrorResponse) => {
        this.errorHandler.validation(error, this.form);
        this.loading = false;
        return EMPTY;
      })
    );
  }

}
