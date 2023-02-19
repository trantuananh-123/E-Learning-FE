import { enviroment } from 'env/enviroment.demo';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { AccessToken } from './../../model/access-token.model';
import { AppStorageService } from './app-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartUpService {

  constructor(
    private appStorageService: AppStorageService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.appStorageService.getData(enviroment.APP_STORAGE_NAME)) {
        this.appStorageService.clearData();
        resolve();
        return;
      } else {
        let accessToken = <AccessToken>JSON.parse(this.appStorageService.getData('_AppStorage'));
        if (this.tokenService.isAccessTokenExpried(accessToken)) {
          this.appStorageService.clearData();
          this.logout();
          resolve();
          return;
        } else {
          resolve();
        }
      }
    });
  }

  logout(): void {
    this.router.navigate(["/user/sign-in"]);
  }
}
