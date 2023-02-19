import { Injectable } from '@angular/core';
import *  as CryptoJS from 'crypto-js';
import { enviroment } from 'env/enviroment.demo';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  key = enviroment.PUBLIC_KEY;

  constructor() { }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key).toString();
  }

  decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
