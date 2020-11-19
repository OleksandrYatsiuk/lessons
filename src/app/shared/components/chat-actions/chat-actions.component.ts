import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { pluck } from 'rxjs/operators';
import { CustomMessage, EContentTypes, EMessageTypes } from 'src/app/admin-panel/messages/message.interface';

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
  @Input() chatId: number;
  @Input() lessonId: string;
  @Output() sended = new EventEmitter<boolean>();

  ngOnInit(): void {
  }


  public sendMessage(text: string, file?: File): void {
    if (file) {
      this.http.sendPhoto({
        chat_id: this.chatId,
        photo: this.file,
        caption: this.message || ''
      }).subscribe(res => this.save(res, EContentTypes.photo));
    } else {
      this.http.sendMessage(this.chatId, text).subscribe(res => this.save(res, EContentTypes.text, text));
    }
  }


  private save(res: any, type: EContentTypes, text?: string): void {

    this.http.saveMessage({
      chat_id: this.chatId,
      lessonId: this.lessonId,
      type: EMessageTypes.bot,
      message: {
        id: res.result.message_id,
        content: {
          type,
          text: text || res.result.caption,
          link: type === EContentTypes.text ? null : res.result.photo[0].file_id,
          fileId: null
        }
      }
    }).pipe(pluck('result')).subscribe(result => {
      this.message = '';
      this.file = null;
      this.sended.emit(true);
    });
  }

  public setFiles(event: Event & { srcElement: HTMLInputElement }): void {
    const files = event.srcElement.files;
    if (!files) {
      return;
    }
    this.file = files[0];
  }
}
