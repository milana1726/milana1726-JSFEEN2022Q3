import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { Keys } from '../models/enums/key-enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
      if (token !== null) {
        return next.handle(
          request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          })
        );
      } else {
        return next.handle(request);
      }
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
