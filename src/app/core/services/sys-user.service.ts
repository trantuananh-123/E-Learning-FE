import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SysUser } from 'src/app/model/sys-user';

const BASE_URL = 'http://localhost:8080/sys-user/'
@Injectable({
  providedIn: 'root'
})
export class SysUserService {

  private serviceUrl: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.serviceUrl = BASE_URL;
  }

  signup(body: object): Observable<SysUser> {
    return this.http.post<SysUser>(`${this.serviceUrl}signUp`, body);
  }
}
