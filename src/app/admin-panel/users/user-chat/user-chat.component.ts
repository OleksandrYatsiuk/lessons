import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EStudyProgress } from 'src/app/core/interfaces/study-progress';
import { MessagesService } from 'src/app/core/services/messages.service';
import { StudyProgressService } from 'src/app/core/services/study-progress.service';
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

  constructor(private route: ActivatedRoute, private http: MessagesService, private progressService: StudyProgressService) { }
  ngOnInit(): void {
    this.user = this.route.parent.snapshot.data.user;
    this.lessonId = this.route.snapshot.params.id;
    this.showMessages();
  }

  updateProgress(progress: EStudyProgress): void {
    this.progressService.queryUpdateProgress({ lessonId: this.lessonId, userId: this.user.id }, { progress })
      .subscribe(res => { });
  }

  showMessages(): void {
    this.messages$ = this._queryMessageList();
  }

  private _queryMessageList(): Observable<CustomMessage[]> {
    return this.http.getList({ userId: this.user.id, lessonId: this.lessonId });
  }

}
