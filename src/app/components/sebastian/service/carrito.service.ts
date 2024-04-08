import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productosEnCarrito: any[] = []; // Arreglo para almacenar los productos en el carrito

  constructor() { }

  agregarAlCarrito(producto: any) {
    this.productosEnCarrito.push(producto); // Agrega un producto al carrito
  }

  obtenerProductosEnCarrito() {
    return this.productosEnCarrito; // Obtiene todos los productos en el carrito
  }

  limpiarCarrito() {
    this.productosEnCarrito = []; // Limpia el carrito, eliminando todos los productos
  }
}
