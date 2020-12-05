import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../core/services/user-data.service';
import { phoneValidator } from '../core/validators/phone.validator';

@Component({
  selector: 'app-start-bot',
  templateUrl: './start-bot.component.html',
  styleUrls: ['./start-bot.component.scss']
})
export class StartBotComponent implements OnInit {
  public phone = new FormControl('+380', [Validators.required, phoneValidator()]);
  constructor(private http: UserDataService) { }

  public ngOnInit(): void {
  }

  public openTelegram(): void {
    this.phone.markAllAsTouched();
    if (this.phone.valid) {
      const phone = this.phone.value;
      this.http.register({ phone: phone.slice(phone.length - 10) }).subscribe(user => {
        window.open(`https://t.me/practical_lagacy_courses_bot?start=${user.phone}`);
      });
    }
  }
}
