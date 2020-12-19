import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { pluck } from 'rxjs/operators';
import { CustomMessage, EContentTypes, EMessageTypes } from 'src/app/admin-panel/messages/message.interface';
import { User } from 'src/app/admin-panel/users/users.component';

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
  @Input() user: User;
  @Input() lessonId: string;
  @Output() sended = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  public sendMessage(text: string, file?: File): void {
    if (file) {
      if (!file.type.includes('image')) {
        this.http.sendDocument({
          chat_id: this.user.chat_id,
          document: this.file,
          caption: this.message || ''
        })
          .subscribe(res => this._save(res, EContentTypes.file));
      } else {
        this.http.sendPhoto({
          chat_id: this.user.chat_id,
          photo: this.file,
          caption: this.message || ''
        })
          .subscribe(res => this._save(res, EContentTypes.photo));
      }
    } else {
      this.http.sendMessage(this.user.chat_id, text)
        .subscribe(res => this._save(res, EContentTypes.text, text));
    }
  }

  private _save(res: any, type: EContentTypes, text?: string): void {
    const fileId = this._getFileLink(res, type);
    this.http.saveMessage({
      userId: this.user.id,
      lessonId: this.lessonId,
      type: EMessageTypes.bot,
      message: {
        id: res.message_id,
        content: {
          type,
          text: text || res.caption,
          link: fileId,
          fileId
        }
      }
    })
      .subscribe(result => {
        this.message = '';
        this.file = null;
        this.sended.emit(true);
      });
  }

  public setFiles(event: Event & { target: HTMLInputElement }): void {
    const files = event.target.files;
    if (!files) {
      return;
    }
    this.file = files[0];
  }

  private _getFileLink(res: any, type: EContentTypes): string {
    switch (type) {
      case EContentTypes.photo:
        return res.photo[0].file_id;
      case EContentTypes.file:
        return res.document.file_id;
      case EContentTypes.text:
        return null;
    }
  }
}
