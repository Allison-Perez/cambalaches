import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000';

  private _userInfo: any = {};
  private isAuthenticatedd: boolean = false;
  private userInfo: any = null;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedd = false;
    this.userInfo = null;
    localStorage.removeItem('user_email');
  }
}
