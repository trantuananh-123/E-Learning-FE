import { SysMenuResponseDTO } from './../../model/dto/sys-menu-response.dto';
import { ListResponseData } from './../../model/response/list-response-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080/sys-menu/'

@Injectable({
    providedIn: 'root'
})
export class SysMenuService {

    serviceUrl: string = '';

    constructor(
        private http: HttpClient,
    ) {
        this.serviceUrl = BASE_URL;
    }

    getALl(): Observable<ListResponseData<Array<SysMenuResponseDTO>>> {
        return this.http.get<ListResponseData<Array<SysMenuResponseDTO>>>(`${this.serviceUrl}get-all`);
    }

}