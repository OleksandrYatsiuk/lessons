import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/admin-panel/users/users.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  isCodePresent = false;
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string; user: User },
    private fb: FormBuilder, private http: UserDataService,
    private ls: LocalStorageService
  ) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      phone: [null, [Validators.required]],
      code: [null]
    });
    if (this.data.user) {
      this.form.get('phone').setValue(this.data.user.phone);
    }
  }
  public onGeneratingCode(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { phone, code } = this.form.value;
      if (code) {
        this._queryCodeCheck(this.form.value)
          .subscribe(result => {
            this.dialogRef.close(phone);
            this.ls.writeToLocalStorage('credentials', { phone, code });
          }, (e) => {
            this.isCodePresent = false;
            this.form.get('code').setValue(null);

          });
      } else {
        this._queryGenerateCode(phone).subscribe(user => {
          this.isCodePresent = true;
          // this.form.get('code').setValue(user.code);
        });
      }
    }
  }

  private _queryGenerateCode(phone: User['phone']): Observable<User> {
    return this.http.generateCode(phone);
  }
  private _queryCodeCheck(data: { phone: string; code: number }): Observable<boolean> {
    return this.http.checkCode(data);
  }

}
