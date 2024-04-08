import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productosEnCarrito: any[] = [];

  constructor() { }

  agregarAlCarrito(producto: any) {
    const index = this.productosEnCarrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      this.productosEnCarrito[index].quantity++;
    } else {
      this.productosEnCarrito.push({ ...producto, quantity: 1 });
    }
  }

  obtenerProductosEnCarrito() {
    return this.productosEnCarrito;
  }

  limpiarCarrito() {
    this.productosEnCarrito = [];
  }

  getTotal() {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total += producto.precio * producto.quantity;
    }
    return total;
  }
}
