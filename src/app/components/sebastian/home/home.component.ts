import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { CarritoService } from '../service/carrito.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private serviceService: ServiceService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos() {
    this.serviceService.getAllProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  comprarProducto(producto: any): void {
    if (this.authService.isAuthenticated()) {
      this.carritoService.agregarAlCarrito(producto);
    } else {
      // Redirigir al usuario al componente de inicio de sesión si no está autenticado
      // Por ejemplo:
      // this.router.navigate(['/login']);
    }
  }
}
