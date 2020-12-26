import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { phoneValidator } from 'src/app/core/validators/phone.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private http: UserDataService,
    private errorHandler: ErrorHandlerService,
    private storage: LocalStorageService
  ) { }
  form: FormGroup;
  loading = false;
  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.form = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._queryUserLogin().subscribe(({ token }) => {
        this.storage.writeToLocalStorage('plc_token', token);
        this.dialogRef.close(true);
      });
    }
  }

  private _queryUserLogin(): Observable<{ token: string }> {
    this.loading = true;
    return this.http.login(this.form.value).pipe(
      catchError(({ error }: HttpErrorResponse) => {
        this.errorHandler.validation(error, this.form);
        this.loading = false;
        return EMPTY;
      })
    );
  }

}
