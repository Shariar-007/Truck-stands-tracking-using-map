import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public static KEYS: any = {
    username: '*&^%&%n^87i5',
    applicationStatus: 'S%$#reg%786v*7i6',
    accessToken: 'A57UB5&ehyr&5b&*6',
    refreshToken: 'RNB*gege&U4^345%36^5u',
    email: 'EUegeg&v3$76u%^&*',
    role: 'RE$DAS&akdhf%^&*',
  };

  static put(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static retrive(key: string) {
    return localStorage.getItem(key);
  }

  static putAuth(user: any) {
    localStorage.setItem(this.KEYS.accessToken, user.data.token);
    localStorage.setItem(this.KEYS.email, user.data.email);
    localStorage.setItem(this.KEYS.role, user.data.logInAs);
    if(user?.data?.userRoles?.length > 0){
      localStorage.setItem(this.KEYS.username, user.data.userRoles[0]?.name);
      localStorage.setItem(this.KEYS.applicationStatus, user.data.userRoles[0]?.applicationStatus);
    }
  }


  static clear(): void {
    localStorage.clear();
  }
}
