import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseApiService} from "../shared/common/base-api.service";
import {AuthService} from "../shared/services/auth.service";
import {Locations} from "../components/truck-stands/models/locations";

@Injectable({
  providedIn: 'root'
})
export class TruckStandsService extends BaseApiService {
  customUrl = '/admin/master/truckstands';

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  getTruckStands() {
    let url = this.getApiURLVersion_1() + this.customUrl;
    return this.http.get<Locations>(url)
  }
}
