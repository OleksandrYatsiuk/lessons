import { Component, OnInit } from '@angular/core';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public file: any;
  public message: string;
  public text: string;
  public chat = 375462081;
  constructor(private http: TelegramBotService) { }

  ngOnInit(): void {
  }
  public sendMessage( text: string): void {
    this.http.sendMessage(this.chat, text).subscribe(res => console.log(res))
  }
  public sendPhoto() {
    this.http.sendPhoto({
      chat_id: this.chat,
      photo: this.file,
      caption: this.message
    }).subscribe(res => console.log(res));
  }

  public setFiles(event) {
    let files = event.srcElement.files
    if (!files) {
      return
    }
    this.file = files[0];
  }
}
