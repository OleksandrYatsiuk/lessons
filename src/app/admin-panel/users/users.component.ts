import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  chat_id: number | null;
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
  constructor(private http: UserDataService) { }

  ngOnInit(): void {
    this.getData()
  }
  public getData(): void {
    this.http.getList().subscribe(users => this.users = users);
  }

  public remove(user: User): void {
    this.http.remove(user.id).subscribe(response => {
      this.getData()
    }, error => {
      console.error(error);
    });
  }

}
