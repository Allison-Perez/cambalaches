import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { AuthService } from '../service/auth.service';
import { CarritoService } from '../service/carrito.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private serviceService: ServiceService,
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.getProductsByEmail(userEmail);
    }
  }

  getProductsByEmail(email: string): void {
    this.serviceService.getProductsByEmail(email).subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos por correo:', error);
      }
    );
  }

  comprarProducto(producto: any): void {
    if (this.authService.isAuthenticated()) { // Verifica si el usuario está autenticado
      this.carritoService.agregarAlCarrito(producto); // Agrega el producto al carrito
      this.router.navigate(['/cart']); // Redirige al usuario al carrito
    } else {
      this.router.navigate(['/login']); // Redirige al usuario al componente de inicio de sesión si no está autenticado
    }
  }
}
