import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/module-admin-panel/users/users.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  isCodePresent = false;
  public form: FormGroup;
  user: any;
  text: string;
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: FormBuilder, private http: UserDataService,
    private ls: LocalStorageService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {

    this.user = this._config.data.user;
    this.text = this._config.data.text;

    this.form = this.fb.group({
      phone: [null, [Validators.required]],
      code: [null]
    });
    if (this.user) {
      this.form.get('phone').setValue(this.user.phone);
    }
  }
  public onGeneratingCode(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { phone, code } = this.form.value;
      if (code) {
        this._queryCodeCheck(this.form.value)
          .subscribe(result => {
            this._ref.close(phone);
            this.ls.writeToLocalStorage('credentials', { phone, code });
          }, (e) => {
            this.isCodePresent = false;
            this.form.get('code').setValue(null);

          });
      } else {
        this._queryGenerateCode(phone)
          .subscribe(user => {
            this.isCodePresent = true;
            this.form.get('code').setValue(user.code);
          });
      }
    }
  }

  close(): void {
    this._ref.close();
  }

  private _queryGenerateCode(phone: User['phone'], chatId?: number): Observable<User> {
    return this.http.generateCode(phone.replace(/[^0-9]/g, ''), chatId);
  }
  private _queryCodeCheck(data: { phone: string; code: number }): Observable<boolean> {
    return this.http.checkCode({ ...data, phone: data.phone.replace(/[^0-9]/g, '') });
  }

}
