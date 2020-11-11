import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _snackBar: MatSnackBar) { }

  private _defaultConf: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'toast--success'
  };

  openSuccess(message: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, 'X', { ...this._defaultConf, ...config });
  }

  openError(message: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, 'X', {
      ...this._defaultConf,
      panelClass: 'toast--error', duration: 6000, ...config
    });
  }
}
