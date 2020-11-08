import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { MessagesService } from 'src/app/core/services/messages.service';
import { CustomMessage, EMessageTypes, EContentTypes } from '../message.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { DeleteComponent } from 'src/app/shared/components/dialogs/delete/delete.component';
import { catchError } from 'rxjs/operators';

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
    private _http: MessagesService,
    private dialog: MatDialog,
    private _notify: NotificationsService) { }

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
            this._notify.openSuccess(response.result);
          } else {
            this._notify.openSuccess(`Повідомлення видалено успішно!`);
          }
        }, (error) => {
          dialog.data.loading = false;
        });
    });
  }

  updateUrl(message: CustomMessage) {
    this._http.refreshTelegramFileLink(message)
      .subscribe(result => {
        console.log(result);
      });
    this.expiredFile = true;
  }

  private _queryDeleteMessage(id: CustomMessage['id']): Observable<any> {
    return this._http.removeMessage(id);
  }

}
