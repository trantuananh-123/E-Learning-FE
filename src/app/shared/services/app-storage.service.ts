import { enviroment } from './../../../../env/enviroment.demo';
import { CryptoService } from './crypto.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  appStorageName = enviroment.APP_STORAGE_NAME;
  storage = localStorage;

  constructor(
    private cryptoService: CryptoService,
  ) { }

  public saveData(key: string, value: any, isToken?: boolean) {
    let keyName = isToken ? this.appStorageName : key;
    let data = isToken ? JSON.stringify(value) : value;
    this.storage.setItem(keyName, this.cryptoService.encrypt(data));
  }

  public getData(key: string) {
    let data = this.storage.getItem(key) || "";
    return this.cryptoService.decrypt(data);
  }

  public removeData(key: string) {
    this.storage.removeItem(key);
  }

  public clearData() {
    this.storage.clear();
  }
}
