import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/core/services/messages.service';
import { CustomMessage, EMessageTypes, EContentTypes } from '../message.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { DeleteComponent } from 'src/app/shared/components/dialogs/delete/delete.component';

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

  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };

  constructor(
    private _http: MessagesService,
    private dialog: MatDialog,
    private _notify: NotificationsService) { }

  ngOnInit(): void {
  }

  openDialog(message: CustomMessage): void {
    const dialogRef = this.dialog.open(DeleteComponent,
      { data: { content: 'повідомлення', loading: false }, ...this.config });
    const dialog = dialogRef.componentInstance;
    dialog.omSubmit.subscribe(() => {
      dialog.data.loading = true;
      this._queryDeleteMessage(message.id)
        .subscribe(() => {
          dialog.data.loading = false;
          this.removed.emit();
          dialogRef.close();
          this._notify.openSuccess(`Повідомлення видалено успішно!`);
        }, error => {
          dialog.data.loading = false;
          console.error(error);
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
