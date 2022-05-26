import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  loginCount = 0;

  isLoggedIn(): boolean {
    if (LocalStorageService.retrive(LocalStorageService.KEYS.accessToken)) {
      return true;
    }
    return false;
  }


  login(value: any) {
    this.loginCount++;
    const loginUrl: string = this.getLoginUrl();
    const userAuth: Observable<any> = this.http.post<any>(loginUrl, value);
    if (this.loginCount <= 1) {
      userAuth.subscribe((auth: any) => {
        console.log(auth);
        this.router.navigate(['/truck-stands']);
        // localStorage.setItem('username', username);
        LocalStorageService.putAuth(auth);
        this.loginCount = 0;
      });
    }
  }

  logout(): void {
    if (this.isLoggedIn()) {
      LocalStorageService.clear();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getAccessToken(): string {
    return LocalStorageService.retrive(LocalStorageService.KEYS.accessToken) as string;
  }

  getRefreshToken(): string {
    return LocalStorageService.retrive(LocalStorageService.KEYS.refreshToken) as string;
  }

  getLoginUrl(): string {
    return environment.base_url + environment.jogajog + environment.api_version_1 + '/auth/adminLogIn';
  }
}
