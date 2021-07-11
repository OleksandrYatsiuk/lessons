import { Lesson } from './../interfaces/courses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';
import { User } from 'src/app/module-admin-panel/users/users.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonsDataService {
  public path = '/lessons';
  private _apiUrl = environment.apiNestUrl;
  constructor(private http: HttpService, private _http: HttpClient) { }

  getLesson(id: Lesson['id'], params?: Partial<User> | any): Observable<Lesson> {
    return this._http.get<Lesson>(`${this._apiUrl}${this.path}/${id}`, { params });
  }
  getLessons(params?: Partial<Lesson> | any): Observable<Lesson[]> {

    const options = {
      params: new HttpParams()
        .set('page', String(1))
        .set('limit', String(20))
        .set('courseId', params?.courseId || null)
    };
    return this._http.get<any & { result: Lesson[] }>(`${this._apiUrl}${this.path}`, options).pipe(pluck('result'));
  }
  create(body: Lesson): Observable<Lesson> {
    return this._http.post<Lesson>(`${this._apiUrl}${this.path}`, body);
  }
  update(id: Lesson['id'], body: Partial<Lesson>): Observable<Lesson> {
    return this._http.put<Lesson>(`${this._apiUrl}${this.path}/${id}`, body);
  }

  delete(id: Lesson['id']): Observable<null> {
    return this._http.delete<null>(`${this._apiUrl}${this.path}/${id}`);
  }
}
