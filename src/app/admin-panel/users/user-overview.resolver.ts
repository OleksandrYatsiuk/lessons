import { UserDataService } from 'src/app/core/services/user-data.service';
import { User } from './users.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserOverviewResolver implements Resolve<any> {
    constructor(private http: UserDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.http.getItem({ _id: route.params.id });
    }
}
