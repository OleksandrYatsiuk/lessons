import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IStaticPages } from '../interfaces/static-pages';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IPaginationResponse } from '../interfaces/pagination';


@Injectable({
  providedIn: 'root'
})

export class StaticPagesService {
  private _nestUrl = environment.apiNestUrl;
  private path = `${this._nestUrl}/pages`;
  constructor(private http: HttpClient) { }

  queryPages(filter?: any): Observable<IPaginationResponse<IStaticPages[]>> {
    const options = {
      params: new HttpParams()
        .set('type', filter?.type ? String(filter?.type) : null)
        .set('path', filter?.path ? filter.path : null)
        .set('page', String(1))
        .set('limit', String(20))
    };

    return this.http.get<IPaginationResponse<IStaticPages[]>>(this.path, options);
  }

  queryCreatePage(data: IStaticPages): Observable<IPaginationResponse<IStaticPages[]>> {
    return this.http.post<IPaginationResponse<IStaticPages[]>>(this.path, data);
  }
  queryEditPage(data: IStaticPages): Observable<IStaticPages> {
    return this.http.put<IStaticPages>(this.path, data);
  }
}
