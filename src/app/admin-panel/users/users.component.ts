import { Observable } from 'rxjs';
import { NotificationsService } from './../../core/services/notifications.service';
import { DeleteComponent } from './../../shared/components/dialogs/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { PreloaderService } from 'src/app/core/services/preloader.service';

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  chat_id: number | null;
  code: number;
  haveMessages: boolean;
  createdAt: number;
  updatedAt: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['view', 'fullName', 'phone', 'email', 'chat_id', 'createdAt', 'updatedAt', 'delete'];
  public users: User[];
  constructor(
    private http: UserDataService,
    private dialog: MatDialog,
    private _notify: NotificationsService,
    private loadService: PreloaderService
  ) { }

  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };

  ngOnInit(): void {
    this.getData();
  }
  public getData(): void {
    this.loadService.start();
    this.http.getList().subscribe(users => {
      this.users = users;
      this.loadService.stop();
    });
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteComponent,
      { data: { content: 'користувача', loading: false }, ...this.config });
    const dialog = dialogRef.componentInstance;
    dialog.omSubmit.subscribe(() => {
      dialog.data.loading = true;
      this._queryUserDelete(user)
        .subscribe(() => {
          dialog.data.loading = false;
          this.getData();
          dialogRef.close();
          this._notify.openSuccess(`Користувач був вилалений успішно!`);
        }, error => {
          console.error(error);
        });
    });
  }

  public _queryUserDelete(user: User): Observable<any> {
    return this.http.remove(user.id);
  }

}
