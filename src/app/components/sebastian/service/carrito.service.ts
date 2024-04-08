import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productosEnCarrito: any[] = []; // Arreglo para almacenar los productos en el carrito

  constructor() { }

  agregarAlCarrito(producto: any) {
    const index = this.productosEnCarrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      this.productosEnCarrito[index].quantity++;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      this.productosEnCarrito.push({ ...producto, quantity: 1 });
    }
  }

  obtenerProductosEnCarrito() {
    return this.productosEnCarrito; // Obtiene todos los productos en el carrito
  }

  limpiarCarrito() {
    this.productosEnCarrito = []; // Limpia el carrito, eliminando todos los productos
  }

  getTotal() {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total += producto.precio * producto.quantity;
    }
    return total;
  }
}
