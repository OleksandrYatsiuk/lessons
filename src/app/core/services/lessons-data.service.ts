import { Lesson } from './../interfaces/courses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsDataService {

  constructor(private http: HttpService) { }
  public path = '/lessons';

  public getLesson(id: Lesson['id']): Observable<Lesson> {
    return this.http.get(`${this.path}/${id}`).pipe(pluck('result'));
  }
  public getLessons(params?: Partial<Lesson>): Observable<Lesson[]> {
    return this.http.get(`${this.path}`, { params }).pipe(pluck('result'));
  }
  public create(body: Lesson): Observable<Lesson> {
    return this.http.post(`${this.path}`, body).pipe(pluck('result'));
  }
  public update(id: Lesson['id'], body: Partial<Lesson>): Observable<Lesson> {
    return this.http.path(`${this.path}/${id}`, body).pipe(pluck('result'));
  }

  public delete(id: Lesson['id']): Observable<object> {
    return this.http.delete(`${this.path}/${id}`).pipe(pluck('result'));
  }
}
