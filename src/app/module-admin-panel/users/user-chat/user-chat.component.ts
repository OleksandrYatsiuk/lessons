import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/core/services/messages.service';
import { CustomMessage } from '../../messages/message.interface';
import { User } from '../users.component';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent implements OnInit {

  user: User;
  lessonId: string;
  messages$: Observable<CustomMessage[]>;
  constructor(private route: ActivatedRoute, private http: MessagesService) { }
  ngOnInit(): void {
    this.user = this.route.parent.snapshot.data.user;
    this.lessonId = this.route.snapshot.params.id;
    this.showMessages();
  }

  showMessages(): void {
    this.messages$ = this._queryMessageList();
  }

  private _queryMessageList(): Observable<CustomMessage[]> {
    return this.http.getList({ userId: this.user._id, lessonId: this.lessonId });
  }

}
