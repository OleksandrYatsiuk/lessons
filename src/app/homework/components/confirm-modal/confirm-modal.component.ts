import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/admin-panel/users/users.component';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string, user: User },
    private fb: FormBuilder, private http: UserDataService
  ) { }
  public form: FormGroup;
  isCodePresent = false;
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
            this.dialogRef.close();
            localStorage.setItem('credentials', JSON.stringify({ phone, code }));
          }, (e) => {
            this.isCodePresent = false;
            this.form.get('code').setValue(null);

          });
      } else {
        this._queryGenerateCode(phone).subscribe(user => {
          this.isCodePresent = true;
          this.form.get('code').setValue(user.code);
        });
      }
    }


  }

  private _queryGenerateCode(phone: User['phone']): Observable<User> {
    return this.http.generateCode(phone);
  }
  private _queryCodeCheck(data: { phone: string, code: number }): Observable<boolean> {
    return this.http.checkCode(data);
  }

}
