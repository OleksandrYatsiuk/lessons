import { Course } from 'src/app/core/interfaces/courses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public path = '/courses';

  constructor(private http: HttpService) {
  }

  public getCourse(id: Course['id']): Observable<Course> {
    return this.http.get(`${this.path}/${id}`).pipe(pluck('result'));
  }

  public editCourse(id: Course['id'], data: Partial<Course>): Observable<Course> {
    return this.http.path(`${this.path}/${id}`, data).pipe(pluck('result'));
  }
  public getCourses(params?: any): Observable<Course[]> {
    return this.http.get(`${this.path}`, params).pipe(pluck('result'));
  }
  public create(body: Partial<Course>): Observable<Course> {
    return this.http.post(`${this.path}`, body).pipe(pluck('result'));
  }
  public delete(id: Course['id']): Observable<any> {
    return this.http.delete(`${this.path}/${id}`).pipe(pluck('result'));
  }
}
