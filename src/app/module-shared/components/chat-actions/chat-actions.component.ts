/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';
import { CustomMessage, EContentTypes, EMessageTypes } from 'src/app/module-admin-panel/messages/message.interface';
import { User } from 'src/app/module-admin-panel/users/users.component';

@Component({
  selector: 'app-chat-actions',
  templateUrl: './chat-actions.component.html',
  styleUrls: ['./chat-actions.component.scss']
})
export class ChatActionsComponent implements OnInit {
  @Input() user: User;
  @Input() lessonId: string;
  @Output() sended = new EventEmitter<boolean>();
  msg: CustomMessage;
  message: string;
  file: File;

  constructor(private http: TelegramBotService) { }

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

  setFiles(event: Event & { target: HTMLInputElement }): void {
    const files = event.target.files;
    if (!files) {
      return;
    }
    this.file = files[0];
  }

  private _save(res: any, type: EContentTypes, text?: string): void {
    const fileId = this._getFileLink(res, type);
    this.http.saveMessage({
      userId: this.user._id,
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
