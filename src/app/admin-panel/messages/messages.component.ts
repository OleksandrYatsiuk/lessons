import { Messages, CustomMessage } from './message.interface';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/core/services/messages.service';
import { TelegramBotService } from 'src/app/core/services/telegram-bot.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public file: any;
  public text: string;
  public chat = 375462081;
  messages: CustomMessage[];
  constructor(private http2:MessagesService) { }

  ngOnInit(): void {
    this.getList(this.chat)
  }
  
  public getList(chat_id:number){
    this.http2.getList({chat_id}).subscribe(messages=>this.messages = messages)
  }
}
