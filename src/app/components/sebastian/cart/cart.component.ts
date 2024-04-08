import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service'; // Asegúrate de importar el servicio del carrito

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productosEnCarrito: any[] = []; // Inicializa un arreglo para almacenar los productos en el carrito
products: any;

  constructor(private carritoService: CarritoService) {} // Inyecta el servicio del carrito

  ngOnInit(): void {
    this.productosEnCarrito = this.carritoService.obtenerProductosEnCarrito(); // Obtén los productos del carrito al inicializar el componente
  }

  getTotal(): number {
    return this.productosEnCarrito.reduce((total, product) => total + (product.precio * product.cantidad), 0); // Calcula el total del carrito
  }

  handleQuantity(product: any, change: number): void {
    product.cantidad += change; // Incrementa o disminuye la cantidad del producto
    if (product.cantidad < 1) {
      this.removeProduct(product); // Si la cantidad es 0, elimina el producto del carrito
    }
  }

  removeProduct(product: any): void {
    const index = this.productosEnCarrito.indexOf(product);
    if (index !== -1) {
      this.productosEnCarrito.splice(index, 1); // Elimina el producto del carrito
    }
  }

  checkout(): void {
    // Agrega aquí la lógica para procesar la orden
    console.log("Procesando el checkout...");
  }
}
