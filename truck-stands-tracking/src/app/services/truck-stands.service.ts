import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseApiService} from "../shared/common/base-api.service";
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TruckStandsService extends BaseApiService {
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json; charset=utf-8',
  //   Authorization: 'Bearer ' + this.authService.getAccessToken()
  // });

  customUrl = '/admin/master/truckstands';

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  getTruckStands() {
  // , {headers: this.headers}
    let url = this.getApiURLVersion_1() + this.customUrl;
    return this.http.get(url)
  }
}
