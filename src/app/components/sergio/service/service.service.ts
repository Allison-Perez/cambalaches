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

  recuperar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, data);
  }

  getAllProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtenerProductos`);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/productos/${id}`, producto);
  }

}
