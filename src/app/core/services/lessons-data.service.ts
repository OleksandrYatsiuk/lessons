import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsDataService {

  constructor(private http: HttpService) { }
  public path = '/lessons'

  public getLesson(id: string): Observable<object> {
    return this.http.get(`${this.path}/${id}`).pipe(pluck('result'));
  }
  public getLessons(params?: object): Observable<any> {
    return this.http.get(`${this.path}`, params).pipe(pluck('result'));
  }
  public create(body: object): Observable<object> {
    return this.http.post(`${this.path}`, body).pipe(pluck('result'));
  }
  public delete(id: string): Observable<object> {
    return this.http.delete(`${this.path}/${id}`).pipe(pluck('result'));
  }
}
