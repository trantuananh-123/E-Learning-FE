import { enviroment } from 'env/enviroment.demo';
import { AccessToken } from 'src/app/model/access-token.model';
import { AppStorageService } from './../shared/services/app-storage.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public appStorageService: AppStorageService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let accessToken = null;

    if (this.appStorageService.getData(enviroment.APP_STORAGE_NAME)) {
      accessToken = <AccessToken>JSON.parse(this.appStorageService.getData(enviroment.APP_STORAGE_NAME));
    }

    const header = 'Bearer ' + accessToken?.access_token;
    let headers = accessToken ? request.headers.set('Authorization', header) : request.headers;

    request = request.clone({ headers });
    return next.handle(request);
  }
}