import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginComponent } from 'src/app/module-admin-panel/login/login.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private storage: LocalStorageService, private router: Router, private _ds: DialogService) { }
    canActivate(): boolean {
        if (!this.storage.getFromLocalStorage('plc_token')) {
            const dialog = this._ds.open(LoginComponent, {
                header: 'Авторизація адміністратора',
                styleClass: 'plc-dynamic-dialog',
                dismissableMask: true
            });

            dialog.onClose.subscribe(result => {
                if (result) {
                    this.router.navigate(['/admin/users']);
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            });
        }
        return true;
    }
}
