import { enviroment } from 'env/enviroment.demo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpStatusCode } from '@angular/common/http';
import { TokenResponseDTO } from 'src/app/model/dto/token-response.dto';
import { AppStorageService } from './../shared/services/app-storage.service';
import { AccessToken } from './../model/access-token.model';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../shared/services/token.service';
import { DetailResponseData } from '../model/response/detail-response-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private appStorageService: AppStorageService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(): boolean {
    let newAccessToken: AccessToken;
    let accessToken = <AccessToken>JSON.parse(this.appStorageService.getData('_AppStorage'));
    if (this.tokenService.isAccessTokenExpried(accessToken) && !this.router.url.includes("/user/sign-in")) {
      this.tokenService.refreshToken({ refresh_token: accessToken.refresh_token }).subscribe({
        next: (data: DetailResponseData<TokenResponseDTO>) => {
          if (data.status == HttpStatusCode.Ok) {
            newAccessToken = this.jwtHelperService.decodeToken(data.data.access_token)!;
            newAccessToken.access_token = data.data.access_token;
            newAccessToken.refresh_token = data.data.refresh_token;
            this.appStorageService.saveData(enviroment.APP_STORAGE_NAME, data.data.access_token, true);
            return true;
          } else {
            this.router.navigate(['/user/sign-in']);
            return false;
          }
        },
        complete: () => {
          return true;
        }
      });
    }
    return true;
  }


}
