import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos: any[] = [];

  constructor(private serviceService: ServiceService) { }

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
}
