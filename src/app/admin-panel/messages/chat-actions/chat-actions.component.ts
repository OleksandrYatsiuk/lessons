import { CustomMessage, EContentTypes, EMessageTypes } from './../message.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { pluck } from 'rxjs/operators';


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
  @Input() lessonId: string;
  @Output() sended = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  public sendMessage(text: string, file?: File): void {
    if (file) {
      this.http.sendPhoto({
        chat_id: this.chat_id,
        photo: this.file,
        caption: this.message
      }).subscribe(res => this.save(res, EContentTypes.photo));
    } else {
      this.http.sendMessage(this.chat_id, text).subscribe(res => this.save(res, EContentTypes.text, text))
    }
  }


  private save(res: any, type: EContentTypes, text?: string) {
    this.http.saveMessage({
      chat_id: this.chat_id,
      lessonId: this.lessonId,
      type: EMessageTypes.bot,
      message: {
        id: res.result.message_id,
        content: {
          type: type,
          text: text || res.result.caption,
          link: type == EContentTypes.text ? null : res.result.photo[0].file_id
        }
      }
    }).pipe(pluck('result')).subscribe(result => {
      this.message = ''
      this.sended.emit(true);
    })
  }

  public setFiles(event: Event & { srcElement: any }) {
    let files = event.srcElement.files
    if (!files) {
      return
    }
    this.file = files[0];
  }
}
