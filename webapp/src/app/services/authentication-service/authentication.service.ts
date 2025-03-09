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
    return this.http.post(this.base_url + '/auth/register', userInfo);
  }

  getLogin(loginInfo: any) {
    return this.http.post(this.base_url + '/auth/login', loginInfo);
  }

  get userName() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }

  get userEmail() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).email;
    }
    return null;
  }

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  get isAdmin() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
