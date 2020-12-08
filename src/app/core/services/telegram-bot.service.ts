import { CustomMessage } from './../../admin-panel/messages/message.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';



@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {
  public apiTelegramUrl = `https://api.telegram.org/bot${environment.telegaBotToken}`;
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  // tslint:disable-next-line: variable-name
  public sendMessage(chat_id: number, text = ''): Observable<any> {
    return this.http.post(`${this.apiTelegramUrl}/sendMessage`, { chat_id, text });
  }

  public sendPhoto(body?: any): Observable<any> {
    return this.http.postFormData(`${this.apiTelegramUrl}/sendPhoto`, body).pipe(pluck('result'));
  }

  public sendDocument(body?: any): Observable<any> {
    return this.http.postFormData(`${this.apiTelegramUrl}/sendDocument`, body, {}, true).pipe(pluck('result'));
  }

  public saveMessage(message: CustomMessage): Observable<any> {
    return this.http.post(this.apiUrl + '/messages/message', message).pipe(pluck('result'));
  }
}
