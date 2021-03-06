import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { MessagesService } from 'src/app/core/services/messages.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { CustomMessage, EMessageTypes, EContentTypes } from 'src/app/module-admin-panel/messages/message.interface';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() item: CustomMessage;
  @Output() removed = new EventEmitter();
  expiredFile: any;
  messageTypes = EMessageTypes;
  contentTypes = EContentTypes;

  constructor(
    private http: MessagesService,
    private _cs: ConfirmService,
    private _ms: MessageService) { }

  ngOnInit(): void {
  }

  openDialog(message: CustomMessage): void {

    this._cs.delete().subscribe(isDeleted => {
      if (isDeleted) {
        this._queryDeleteMessage(message.id)
          .subscribe(response => {
            this.removed.emit();
            if (response?.code) {
              this._ms.add({ severity: 'success', detail: response.result });
            } else {
              this._ms.add({ severity: 'success', detail: `Повідомлення видалено успішно!` });
            }
          });
      }
    });
  }

  updateUrl(): void {
    this.expiredFile = true;
  }

  refreshFileLink(message: CustomMessage): void {
    this._queryRefreshFileLink(message)
      .subscribe(result => this.removed.emit());
  }

  private _queryDeleteMessage(id: CustomMessage['id']): Observable<any> {
    return this.http.removeMessage(id);
  }

  private _queryRefreshFileLink(msg: CustomMessage): Observable<CustomMessage> {
    return this.http.refreshTelegramFileLink(msg)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this._ms.add({ severity: 'error', detail: error.result });
          return EMPTY;
        })
      );
  }

}
