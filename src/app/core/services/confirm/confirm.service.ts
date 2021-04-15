import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private _confirmService: ConfirmationService, private _ts: TranslateService) { }

  public confirm(confirmation?: Confirmation): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this._confirmService.confirm({
        key: 'warning',
        message: this._ts.instant('unsavedChangesQuestion'),
        acceptButtonStyleClass: 'button button--yellow',
        rejectButtonStyleClass: 'button button--grey',
        acceptLabel: this._ts.instant('acceptLabel'),
        rejectLabel: this._ts.instant('cancelLabel'),
        ...confirmation,
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
  public delete(confirmation?: Confirmation): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this._confirmService.confirm({
        dismissableMask: true,
        header: this._ts.instant('confirmDeleteHeader'),
        rejectButtonStyleClass: 'button button--grey',
        acceptButtonStyleClass: 'button button--red',
        key: 'dangerous',
        rejectLabel: this._ts.instant('cancelLabel'),
        acceptLabel: this._ts.instant('deleteLabel'),
        ...confirmation,
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}

