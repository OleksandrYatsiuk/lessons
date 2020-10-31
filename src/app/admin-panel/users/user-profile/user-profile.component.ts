import { UserDataService } from 'src/app/core/services/user-data.service';
import { User } from './../users.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  constructor(private route: ActivatedRoute, private http: UserDataService) {
    this.user = this.route.snapshot.data.user;
    console.log(this.route);
  }

  ngOnInit(): void {
    // this.http.getItem({ id: "5f89e40318752200255ec191" }).subscribe(result => console.log(result))
  }

}
