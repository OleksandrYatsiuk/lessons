import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-bot',
  templateUrl: './start-bot.component.html',
  styleUrls: ['./start-bot.component.scss']
})
export class StartBotComponent implements OnInit {
  public phone = '+380';
  constructor() { }

  public ngOnInit(): void {
  }

  public openTelegram(): void {
    window.open('https://t.me/practical_lagacy_courses_bot?command=/start', '_blank');
  }
}
