import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productosEnCarrito: any[] = [];
  total: number = 0;

  constructor(public carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productosEnCarrito = this.carritoService.obtenerProductosEnCarrito();
    this.calcularTotal();
  }

  handleQuantity(product: any, change: number): void {
    product.cantidad += change;
    if (product.cantidad < 1) {
      this.removeProduct(product);
    }
    this.calcularTotal();
  }

  removeProduct(product: any): void {
    const index = this.productosEnCarrito.indexOf(product);
    if (index !== -1) {
      this.productosEnCarrito.splice(index, 1);
    }
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.productosEnCarrito.reduce((total, product) => {
      const subtotal = product.precio * product.cantidad;
      return total + (subtotal > 0 ? subtotal : product.precio);
    }, 0);
  }
  

  checkout(): void {
    console.log("Procesando el checkout...");
  }
}
