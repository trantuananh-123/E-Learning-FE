import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenResponseDTO } from 'src/app/model/dto/token-response.dto';
import { DetailResponseData } from 'src/app/model/response/detail-response-data.model';
import { SysUser } from 'src/app/model/sys-user.model';

const BASE_URL = 'http://localhost:8080/sys-user/'
@Injectable({
  providedIn: 'root'
})
export class SysUserService {

  user: BehaviorSubject<SysUser | null> = new BehaviorSubject<SysUser | null>(null);

  serviceUrl: string = '';

  constructor(
    private http: HttpClient,
  ) {
    this.serviceUrl = BASE_URL;
  }

  signup(body: object): Observable<DetailResponseData<SysUser>> {
    return this.http.post<DetailResponseData<SysUser>>(`${this.serviceUrl}signUp`, body);
  }

  signin(body: object): Observable<DetailResponseData<TokenResponseDTO>> {
    return this.http.post<DetailResponseData<TokenResponseDTO>>(`${this.serviceUrl}login`, body);
  }

  getDetail(): Observable<DetailResponseData<SysUser>> {
    return this.http.get<DetailResponseData<SysUser>>(`${this.serviceUrl}get-detail`).pipe(
      tap((data: DetailResponseData<SysUser>) => {
        this.user.next(data.data);
      })
    );
  }

  getUserInfo(): SysUser | null {
    if (this.user.value) {
      return this.user.value;
    }
    return null;
  }
}
