import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public path = '/messages'

  constructor(private http: HttpService) { }

  public getList(params: any): Observable<any> {
    return this.http.get(this.path, { params }).pipe(pluck('result'));
  }
}
