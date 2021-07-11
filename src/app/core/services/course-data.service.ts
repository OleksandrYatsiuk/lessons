import { Course } from 'src/app/core/interfaces/courses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public path = '/courses';
  private _apiUrl = environment.apiNestUrl;

  constructor(private http: HttpService,
    private _http: HttpClient) {
  }

  getCourse(id: Course['id']): Observable<Course> {
    return this._http.get<Course>(`${this._apiUrl}${this.path}/${id}`);
  }

  editCourse(id: Course['id'], data: Partial<Course>): Observable<Course> {
    return this._http.put<Course>(`${this._apiUrl}${this.path}/${id}`, data);
  }

  getCourses(params?: any): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}${this.path}`, params).pipe(pluck('result'));
  }
  create(body: Partial<Course>): Observable<Course> {
    return this._http.post<Course>(`${this._apiUrl}${this.path}`, body);
  }
  delete(id: Course['id']): Observable<null> {
    return this._http.delete<null>(`${this._apiUrl}${this.path}/${id}`);
  }
}
