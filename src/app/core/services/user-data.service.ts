import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { User } from 'src/app/admin-panel/users/users.component';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = environment.apiUrl;
  private path = '/users';
  constructor(private http: HttpClient) { }

  public getList(page?: number, limit?: number): Observable<User[]> {
    return this.http.get(`${this.apiUrl}${this.path}`).pipe(pluck('result'));
  }
  public register(user: Partial<User>): Observable<User> {
    return this.http.post(`${this.apiUrl}${this.path}/register`, user).pipe(pluck('result'));
  }
  public update(user: Partial<User>): Observable<User> {
    return this.http.patch(`${this.apiUrl}${this.path}/current`, user).pipe(pluck('result'));
  }
  public remove(id: User['id']): Observable<string> {
    return this.http.delete(`${this.apiUrl}${this.path}/${id}`).pipe(pluck('result'));
  }
  public getItem(user): Observable<User> {
    return this.http.get(`${this.apiUrl}${this.path}`, { params: user }).pipe(pluck('result'));
  }
}
