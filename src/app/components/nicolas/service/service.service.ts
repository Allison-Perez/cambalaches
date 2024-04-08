import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http:HttpClient) { }

  apiUrl = 'http://localhost:3000';

  login(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  registro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  getUserInfoByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/api/obtener-usuario?correo=${email}`;
    return this.http.get(url);
  }

  getCategorias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/categorias`);
  }

  getEstadoProducto(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/estadoProducto`);
  }

  subirProducto(productoData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos`, productoData);
  }

  getAllUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/usuarios`);
  }

  getProductsByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/api/obtenerProductos/${email}`;
    return this.http.get(url);
  }

  getAllProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtenertodosProductos`);
  }

}
