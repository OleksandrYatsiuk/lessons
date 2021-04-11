import { Lesson } from './../interfaces/courses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';
import { User } from 'src/app/module-admin-panel/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class LessonsDataService {
  public path = '/lessons';
  constructor(private http: HttpService) { }

  public getLesson(id: Lesson['id'], params?: Partial<User>): Observable<Lesson> {
    return this.http.get(`${this.path}/${id}`, { params }).pipe(pluck('result'));
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

  public delete(id: Lesson['id']): Observable<any> {
    return this.http.delete(`${this.path}/${id}`).pipe(pluck('result'));
  }
}
