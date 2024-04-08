import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { CarritoService } from '../service/carrito.service';

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
    private router: Router
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
    this.carritoService.agregarAlCarrito(producto); // Agrega el producto al carrito
    this.router.navigate(['/cart']); // Redirige al usuario al carrito
  }
}
