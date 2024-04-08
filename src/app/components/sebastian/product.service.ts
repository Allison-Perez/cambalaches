import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cart: any[] = [];
  private apiUrl = 'http://localhost:3000/obtenertodosProductos';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    // Aquí puedes verificar si hay una URL de API configurada para obtener productos desde el backend
    // Si la URL está definida, haces una solicitud HTTP GET para obtener productos
    // Si no, devuelves los productos estáticos

    if (this.apiUrl) {
      return this.http.get<any[]>(this.apiUrl);
    } else {
      // Si no hay una URL de API definida, devolvemos los productos estáticos
      return of([
        { id: 1, name: 'Abrigo Azul', price: 150.00, image: '/assets/Chica_Chaqueta_Azul.jpeg' },
        { id: 2, name: 'Gaban Formal', price: 250.00, image: '/assets/modelos-masculinos.jpeg' },
        { id: 3, name: 'Gaban Semi Formal', price: 180.00, image: '/assets/chica_cami_cuadros.jpeg' },
        { id: 4, name: 'Chaqueta de Cuero', price: 200.00, image: '/assets/Chica_Chaqueta_Cuero.jpeg' },
      ]);
    }
  }

  addToCart(product: any): void {
    this.cart.push(product);
  }

  getCart(): any[] {
    return this.cart;
  }
}
