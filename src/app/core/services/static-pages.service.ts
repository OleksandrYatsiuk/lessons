import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IStaticPages } from '../interfaces/static-pages';


@Injectable({
  providedIn: 'root'
})

export class StaticPagesService {
  private path = '/static-pages';
  constructor(private http: HttpService) { }

  getStaticPages(params?: any): Observable<IStaticPages[]> {
    return this.http.get(this.path, { params }).pipe(pluck('result'));
  }

  setStaticPage(data: IStaticPages): Observable<IStaticPages> {
    return this.http.post(this.path, data).pipe(pluck('result'));
  }

}
