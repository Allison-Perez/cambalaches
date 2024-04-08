import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-edid-products',
  templateUrl: './edid-products.component.html',
  styleUrls: ['./edid-products.component.scss']
})
export class EdidProductsComponent implements OnInit {
  productos: any[] = [];
  productoSeleccionado: any = {};
  editMode: boolean = false;

  constructor(
    private ServiceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos() {
    this.ServiceService.getAllProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  editarProducto(producto: any) {
    this.productoSeleccionado = producto;
    this.editMode = true;
  }

  guardarCambios() {
    this.ServiceService.actualizarProducto(this.productoSeleccionado.identificador, this.productoSeleccionado).subscribe(
      (response) => {
        console.log('Producto actualizado correctamente:', response);
        this.editMode = false;
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

}
