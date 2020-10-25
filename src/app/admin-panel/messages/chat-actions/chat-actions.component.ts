import { CustomMessage } from './../message.interface';
import { Component, Input, OnInit } from '@angular/core';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';


@Component({
  selector: 'app-chat-actions',
  templateUrl: './chat-actions.component.html',
  styleUrls: ['./chat-actions.component.scss']
})
export class ChatActionsComponent implements OnInit {

  constructor(private http: TelegramBotService) { }
  msg: CustomMessage;
  message: string;
  file: File;
  @Input() chat_id: number;

  ngOnInit(): void {
  }
  public sendMessage(text: string, file?: File): void {
    if (file) {
      this.http.sendPhoto({
        chat_id: this.chat_id,
        photo: this.file,
        caption: this.message
      }).subscribe(res => console.log(res));
    } else {
      this.http.sendMessage(this.chat_id, text).subscribe(res => console.log(res))
    }
  }

  public setFiles(event: Event & { srcElement: any }) {
    let files = event.srcElement.files
    if (!files) {
      return
    }
    this.file = files[0];
  }
}
