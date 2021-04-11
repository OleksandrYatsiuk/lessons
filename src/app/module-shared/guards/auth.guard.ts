import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, CanActivate } from '@angular/router';
import { LoginComponent } from 'src/app/admin-panel/login/login.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private storage: LocalStorageService, private router: Router, private dialog: MatDialog) { }
    canActivate(): boolean {
        if (!this.storage.getFromLocalStorage('plc_token')) {
            const dialog = this.dialog.open(LoginComponent, {
                autoFocus: false,
                disableClose: true,
                hasBackdrop: true
            });
            dialog.afterClosed().subscribe(result => {
                if (result) {
                    this.router.navigate(['/admin/users']);
                    return true;
                } else {
                    return false;
                }
            });
        }
        return true;
    }
}
