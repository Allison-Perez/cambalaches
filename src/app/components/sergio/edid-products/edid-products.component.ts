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
  categorias: any[] = [];
  estadosProducto: any[] = [];
  categoria = null; // Elimina la coma al final
  estado = null; // Elimina la coma al final

  constructor(
    private ServiceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProductos();
    this.obtenerCategorias();
    this.obtenerEstadosProducto();

  }

  obtenerCategorias() {
    console.log('Obteniendo categorías...');
    this.ServiceService.getCategorias().subscribe(
      (data) => {
        console.log('Categorías obtenidas:', data);
        this.categorias = data.map((categoria: any) => {
          return { identificador: categoria.identificador, nombre: categoria.nombre };
        });
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  obtenerEstadosProducto() {
    console.log('Obteniendo estados de producto...');
    this.ServiceService.getEstadoProducto().subscribe(
      (data) => {
        console.log('Estados de producto obtenidos:', data);
        this.estadosProducto = data.map((estado: any) => {
          return { identificador: estado.identificador, nombre: estado.nombre };
        });
      },
      (error) => {
        console.error('Error al obtener estados de producto:', error);
      }
    );
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

  eliminarProducto(producto: any) {
    const confirmarEliminar = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmarEliminar) {
      this.ServiceService.eliminarProducto(producto.identificador).subscribe(
        (response) => {
          console.log('Producto eliminado correctamente:', response);
          this.getAllProductos();
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }


}
