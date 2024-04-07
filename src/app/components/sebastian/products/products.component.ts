import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data; // Suponiendo que el servicio devuelve un array de productos
      },
      (error: any) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  addToCart(product: any): void {
    // Agrega el producto al carrito
    this.productService.addToCart(product);
    // Redirige al usuario al componente del carrito
    this.router.navigate(['/cart']);
  }
}
