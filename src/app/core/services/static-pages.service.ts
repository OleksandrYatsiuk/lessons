import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IStaticPages } from '../interfaces/static-pages';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})

export class StaticPagesService {
  private _nestUrl = environment.apiNestUrl;
  private path = `${this._nestUrl}/pages`;
  constructor(private http: HttpClient) { }

  queryPages(filter?: any): Observable<IStaticPages[]> {

    return this.http.get(this.path, filter || {}).pipe(pluck('result'));
  }

  queryEditPage(data: IStaticPages): Observable<IStaticPages> {
    return this.http.post(this.path, data).pipe(pluck('result'));
  }

}
