import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {

  constructor() {}

  getApiURLVersion_1 () {
    return environment.base_url + environment.adminJogajog + environment.api_version_1;
  }
}
