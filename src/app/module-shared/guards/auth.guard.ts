import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginComponent } from 'src/app/module-admin-panel/login/login.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private storage: LocalStorageService,
        private router: Router,
        private _ds: DialogService,
    ) { }
    canActivate(): boolean {
        if (isPlatformBrowser(this.platformId)) {
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
        }

        return true;
    }
}
