import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EStudyProgress } from 'src/app/core/interfaces/study-progress';
import { MessagesService } from 'src/app/core/services/messages.service';
import { CustomMessage } from '../../messages/message.interface';
import { User } from '../users.component';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: MessagesService) { }
  user: User;
  lessonId: string;
  messages$: Observable<CustomMessage[]>;
  public progress = [
    {
      label: 'Не розпочато', value: EStudyProgress.NOT_STARTED
    },
    {
      label: 'Розпочато', value: EStudyProgress.STARTED
    },
    {
      label: 'В процесі', value: EStudyProgress.IN_PROGRESS
    },
    {
      label: 'Завершено', value: EStudyProgress.COMPLETED
    }
  ];

  ngOnInit(): void {
    this.user = this.route.parent.snapshot.data.user;
    this.lessonId = this.route.snapshot.params.id;
    this.showMessages();
  }


   showMessages(): void {
    this.messages$ = this._queryMessageList();
  }

  private _queryMessageList(): Observable<CustomMessage[]> {
    return this.http.getList({ chat_id: this.user.chat_id, lessonId: this.lessonId });
  }

}
