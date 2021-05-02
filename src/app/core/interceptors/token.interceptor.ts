import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private bearerToken = this.storage.getFromLocalStorage('plc_token');

  constructor(private storage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(environment.apiUrl) || request.url.includes(environment.apiNestUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.bearerToken}`,
          // 'Accept-Encoding': 'gzip, compress, br'
        }
      });
    }
    return next.handle(request);
  }
}
