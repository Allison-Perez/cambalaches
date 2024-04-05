import { Component } from '@angular/core';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: Product[] = [
    {
      name: 'Gaban',
      description: 'Gaban Semi Formal',
      price: 180.000,
      image: 'assets/chica_cami_cuadros.jpeg'
    },
    {
      name: 'Abrigo',
      description: 'Abrigo Azul',
      price: 150.000,
      image: 'assets/Chica_Chaqueta_Azul.jpeg'
    },
    {
      name: 'Chaqueta',
      description: 'Chaqueta de Cuero',
      price: 200.000,
      image: 'assets/Chica_Chaqueta_Cuero.jpeg'
    },
    {
      name: 'Gaban Caballero',
      description: 'Gaban Formal',
      price: 50.00,
      image: 'assets/modelos-masculinos.jpeg'
    }
    
  ];

  addToCart(product: Product) {
    // Aquí irá la lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito:', product);
  }
}
