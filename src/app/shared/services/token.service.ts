import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenResponseDTO } from './../../model/dto/token-response.dto';
import { Injectable } from '@angular/core';
import { AccessToken } from 'src/app/model/access-token.model';
import { HttpClient } from '@angular/common/http';
import { DetailResponseData } from 'src/app/model/response/detail-response-data.model';

const BASE_URL = 'http://localhost:8080/sys-user/'
@Injectable({
    providedIn: 'root'
})
export class TokenService {

    jwtHelperService: JwtHelperService = new JwtHelperService();

    serviceUrl: string = '';

    constructor(
        private http: HttpClient,
    ) {
        this.serviceUrl = BASE_URL;
    }

    isAccessTokenExpried(token: AccessToken): boolean {
        if (token == null || token?.exp === undefined || token?.exp == null) {
            return true;
        }
        return this.jwtHelperService.isTokenExpired(token.access_token);
    }

    refreshToken(body: object): Observable<DetailResponseData<TokenResponseDTO>> {
        return this.http.post<DetailResponseData<TokenResponseDTO>>(`${this.serviceUrl}refresh-token`, body);
    }
}