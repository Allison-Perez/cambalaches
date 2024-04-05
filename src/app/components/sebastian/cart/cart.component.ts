import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  categorias: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simulación de carga de datos del carrito desde localStorage o una API
    this.loadCartData();
  }

  loadCartData() {
    // Aquí puedes cargar los datos del carrito desde localStorage o una API
    // Por ejemplo, cargar los datos desde localStorage si existen
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.carts = JSON.parse(cartData);
      this.calculateTotal();
    }
  }
 
  calculateTotal() {
    this.total = this.carts.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  handleInc(id: number) {
    const updatedCart = this.carts.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    this.updateCart(updatedCart);
  }

  handleDec(id: number) {
    const updatedCart = this.carts.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    }).filter(item => item.quantity > 0); // Eliminar elementos con cantidad cero
    this.updateCart(updatedCart);
  }

  removeProduct(id: number) {
    const updatedCart = this.carts.filter(item => item.id !== id);
    this.updateCart(updatedCart);
  }

  updateCart(updatedCart: CartItem[]) {
    this.carts = updatedCart;
    this.calculateTotal();
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  checkout() {
    // Aquí puedes implementar la lógica para el proceso de pago
    // Por ejemplo, redirigir a una página de pago
    this.router.navigate(['/checkout']);
  }
  goBack() {
    this.router.navigate(['/index']);
  }
}
