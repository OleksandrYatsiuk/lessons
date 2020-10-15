import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {
  public url = `https://api.telegram.org/bot${environment.telegaBotToken}/`;
  constructor(private http: HttpClient) { }

  public sendMessage(chat_id, text): Observable<any> {
    return this.http.post(this.url + 'sendMessage', {
      chat_id, text
    })
  }
 
  public sendPhoto(body?: any): Observable<any> {
    const formData = this.getFormData(body);
    return this.http.post(this.url + 'sendPhoto', formData);
  }

  private getFormData(raw: object): FormData {
    const formData = new FormData();

    Object.entries(raw)
      .filter(([param, value]) => value !== null)
      .forEach(([param, value]) => {
        if (Array.isArray(value)) {
          this.setArrayKeys(formData, param, value)
        } else if (typeof value == "object") {
          if (value instanceof File) {
            formData.append(param, value);
          } else {
            this.setObjectKeys(formData, param, value)
          }
        } else {
          formData.append(param, value);
        }
      });
    return formData;
  }

  private setArrayKeys(formData: FormData, param: string, array: string[]): void {
    array.forEach((el, index) => {
      formData.append(`${param}[${index}]`, el);
    })
  }

  private setObjectKeys(formData: FormData, param: string, object: object): void {

    for (const key in object) {
      formData.append(`${param}[${key}]`, object[key]);
    }
  }
}
