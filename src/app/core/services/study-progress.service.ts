import { IStudyProgress } from './../interfaces/study-progress';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudyProgressService {
  private path = '/study-progress';
  constructor(private http: HttpService) { }

  queryProgress(id: IStudyProgress['_id'], params?: any): Observable<IStudyProgress[]> {
    return this.http.get(`${this.path}/progress/${id}`, params).pipe(pluck('result'));
  }
  queryUpdateProgress(params: Partial<IStudyProgress>, data: Partial<IStudyProgress>): Observable<IStudyProgress> {
    return this.http.path(`${this.path}`, data, { params }).pipe(pluck('result'));
  }
}
