import { Observable } from 'rxjs';
import { NotificationsService } from '../../core/services/notifications.service';
import { DeleteComponent } from '../../module-shared/components/dialogs/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
  users: User[];
  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };

  constructor(
    private http: UserDataService,
    private dialog: MatDialog,
    private _notify: NotificationsService,
    private loadService: PreloaderService,
    private _cs: ConfirmService
  ) { }


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
    this._cs.delete().subscribe(isDelete => {
      if (isDelete) {
        this._queryUserDelete(user)
          .subscribe(() => {
            this.getData();
            this._notify.openSuccess(`Користувач був видалений успішно!`);
          }, error => {
            console.error(error);
          });
      }
    });
  }

  public _queryUserDelete(user: User): Observable<any> {
    return this.http.remove(user.id);
  }

}
