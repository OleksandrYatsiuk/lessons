import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { MessagesService } from 'src/app/core/services/messages.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { DeleteComponent } from 'src/app/shared/components/dialogs/delete/delete.component';
import { catchError } from 'rxjs/operators';
import { CustomMessage, EMessageTypes, EContentTypes } from 'src/app/admin-panel/messages/message.interface';

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
    private dialog: MatDialog,
    private notify: NotificationsService) { }

  ngOnInit(): void {
  }

  openDialog(message: CustomMessage): void {
    const dialogRef = this.dialog.open(DeleteComponent,
      { data: { content: 'повідомлення', loading: false }, autoFocus: false });
    const dialog = dialogRef.componentInstance;
    dialog.omSubmit.subscribe(() => {
      dialog.data.loading = true;
      this._queryDeleteMessage(message.id)
        .subscribe(response => {
          dialog.data.loading = false;
          this.removed.emit();
          dialogRef.close();
          if (response?.code) {
            this.notify.openSuccess(response.result);
          } else {
            this.notify.openSuccess(`Повідомлення видалено успішно!`);
          }
        }, (error) => {
          dialog.data.loading = false;
        });
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
          this.notify.openError(error.result);
          return EMPTY;
        })
      );
  }

}
