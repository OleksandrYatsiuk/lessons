import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { PreloaderService } from 'src/app/core/services/preloader.service';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';
import { MessageService } from 'primeng/api';

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

  constructor(
    private http: UserDataService,
    private _ms: MessageService,
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
            this._ms.add({ severity: 'success', detail: 'Користувач був видалений успішно!' });
          }, error => {
            this._ms.add({ severity: 'error', detail: error });
          });
      }
    });
  }

  public _queryUserDelete(user: User): Observable<any> {
    return this.http.remove(user.id);
  }

}
