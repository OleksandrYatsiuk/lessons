import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: LocalStorageService) { }

  private bearerToken = this.storage.getFromLocalStorage('plc_token');

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(environment.apiUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.bearerToken}`
        }
      });
    }
    return next.handle(request);
  }
}
