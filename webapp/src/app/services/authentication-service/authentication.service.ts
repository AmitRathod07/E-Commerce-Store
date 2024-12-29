import { inject, Injectable } from '@angular/core';
import { environment_dev } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http = inject(HttpClient);
  base_url = environment_dev.apiurl;

  constructor() { }

  getRegister(userInfo: any) {
    return this.http.post(this.base_url + '/auth/register', { body: userInfo });
  }

  getLogin(loginInfo: any) {
    return this.http.post(this.base_url + '/auth/login', { body: loginInfo });
  }
}
