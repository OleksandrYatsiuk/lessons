import { MessagesService } from 'src/app/core/services/messages.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomMessage } from './message.interface';

@Injectable()
export class MessagesResolver implements Resolve<any> {
    constructor(private http: MessagesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomMessage[]> {
        if (Object.keys(route.queryParams).length) {
            return this.http.getList(route.queryParams);
        }
    }
}
