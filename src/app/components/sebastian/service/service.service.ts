import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = 'http://localhost:3000';
  private _isAuthenticated = false;
  private _userRole: number = 0;
  private _userFichas: number[] = [];
  private _userInfo: any = {};
  private isAuthenticatedd: boolean = false;
  private userInfo: any = null;

  constructor(private http: HttpClient) { }


  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }


  logout() {
    localStorage.removeItem('token');
    // Implementa la lógica de cierre de sesión aquí y establece this.isAuthenticated en false.
    this.isAuthenticatedd = false;
    this.userInfo = null;

    // Elimina el correo electrónico del usuario del almacenamiento local al cerrar sesión.
    localStorage.removeItem('user_email');
  }


  getProductsByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/api/obtenerProductos/${email}`;
    return this.http.get(url);
  }

  getAllProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtenerProductos`);
  }

}
