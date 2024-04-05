import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cart: any[] = [];

  constructor() { }

  getProducts(): any[] {
    return [
      { id: 1, name: 'Abrigo Azul', price: 150.000, image: '/assets/Chica_Chaqueta_Azul.jpeg' },
      { id: 2, name: 'Gaban Formal', price: 250.000, image: '/assets/modelos-masculinos.jpeg' },
      { id: 3, name: 'Gaban Semi Formal', price: 180.000, image: '/assets/chica_cami_cuadros.jpeg' },
      { id: 4, name: 'Chaqueta de Cuero', price: 200.000, image: '/assets/Chica_Chaqueta_Cuero.jpeg' },
      // Agrega más productos aquí si es necesario
    ];
  }

  addToCart(product: any): void {
    this.cart.push(product);
  }

  getCart(): any[] {
    return this.cart;
  }
}
