import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { User } from 'src/app/module-admin-panel/users/users.component';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = environment.apiUrl;
  private _apiUrl = environment.apiNestUrl;
  private path = '/users';
  constructor(private http: HttpClient) { }

  public getList(page?: number, limit?: number): Observable<User[]> {
    return this.http.get<any>(`${this._apiUrl}${this.path}`).pipe(pluck('result'));
  }
  public register(user: Partial<User>): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}${this.path}/register`, user).pipe(pluck('result'));
  }
  public update(user: Partial<User>): Observable<User> {
    return this.http.patch<any>(`${this.apiUrl}${this.path}/current`, user).pipe(pluck('result'));
  }
  public generateCode(phone: User['phone'], chatId: number): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}${this.path}/code`, { phone, chat_id: chatId || 375462081 }).pipe(pluck('result'));
  }
  public checkCode(data: { code: number; phone: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}${this.path}/code-check`, data).pipe(pluck('result'));
  }
  public remove(id: User['id']): Observable<string> {
    return this.http.delete<any & { result: string }>(`${this._apiUrl}${this.path}/${id}`).pipe(pluck('result'));
  }
  public getItem(user: any): Observable<User> {
    return this.http.get<any & { result: User }>(`${this.apiUrl}${this.path}/user`, { params: user }).pipe(pluck('result'));
  }
  public login(body: { password: string; phone: string }): Observable<User> {
    return this.http.post<User>(`${this._apiUrl}${this.path}/login`, body);
  }
}
