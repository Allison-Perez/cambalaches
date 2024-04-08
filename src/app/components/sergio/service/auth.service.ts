import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000';

  private _userInfo: any = {};
  private _isAuthenticated = false;
  private _userRole: number = 0;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getUserRole(): number {
    return this._userRole;
  }

  logout() {
    localStorage.removeItem('user_email');
  }

  setAuthenticationStatus(status: boolean, role: number, userInfo: any): void {
    this._isAuthenticated = status;
    this._userRole = role;
    this._userInfo = userInfo;
  }

  getUserEmailFromLocalStorage(): string {
    return localStorage.getItem('user_email') || '';
  }

}
