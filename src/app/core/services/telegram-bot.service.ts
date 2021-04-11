import { CustomMessage } from '../../module-admin-panel/messages/message.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {
  public apiTelegramUrl = `https://api.telegram.org/bot${environment.telegaBotToken}`;
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpService, private rest: HttpClient) { }

  public sendMessage(chatId: number, text = ''): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.rest.post(`${this.apiTelegramUrl}/sendMessage`, { chat_id: chatId, text }).pipe(pluck('result'));
  }

  public sendPhoto(body?: any): Observable<any> {
    return this.http.postFormData(`${this.apiTelegramUrl}/sendPhoto`, body, {}, true).pipe(pluck('result'));
  }

  public sendDocument(body?: any): Observable<any> {
    return this.http.postFormData(`${this.apiTelegramUrl}/sendDocument`, body, {}, true).pipe(pluck('result'));
  }

  public saveMessage(message: CustomMessage): Observable<any> {
    return this.http.post('/messages/message', message).pipe(pluck('result'));
  }

}
