import { Component } from '@angular/core';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
total: any;
handleInc(arg0: any) {
throw new Error('Method not implemented.');
}
handleDec(arg0: any) {
throw new Error('Method not implemented.');
}
  products: Product[] = [
    { id: 1, title: "Producto 1", price: 10.00, image: "imagen1.jpg", quantity: 1 },
    { id: 2, title: "Producto 2", price: 20.00, image: "imagen2.jpg", quantity: 1 },
    { id: 3, title: "Producto 3", price: 30.00, image: "imagen3.jpg", quantity: 1 }
  ];
carts: any;

  getTotal(): number {
    return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  handleQuantity(product: Product, change: number): void {
    product.quantity += change;
    if (product.quantity < 1) {
      this.removeProduct(product);
    }
  }

  removeProduct(product: Product): void {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  checkout(): void {
    // Lógica de procesamiento de la orden
    console.log("Procesando el checkout...");
  }
}
