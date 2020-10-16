import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../core/services/user-data.service';

@Component({
  selector: 'app-start-bot',
  templateUrl: './start-bot.component.html',
  styleUrls: ['./start-bot.component.scss']
})
export class StartBotComponent implements OnInit {
  public phone = new FormControl('+380', Validators.required)
  constructor(private http: UserDataService) { }

  public ngOnInit(): void {
  }

  public openTelegram(): void {
    if (this.phone.valid) {
      this.http.register({ phone: this.phone.value }).subscribe(user => {
        console.log(user);
        window.open(`https://t.me/practical_lagacy_courses_bot?start=${user.phone}`, '_blank');
      }, (error) => {
        console.log(error);
      })

    }
    console.log(this.phone.value);
  }
}
