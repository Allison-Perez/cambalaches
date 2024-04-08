import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  newsList: any[] = [];
  newProduct: any = {
    titulo: '',
    descripcion: '',
    precio: '',
    imagenOpcional: null,
    categoria: null,
    estado: null,
  };
  imageFile: File | null = null;
  imagenOpcionalFile: File | null = null;
  categorias: any[] = [];
  estadosProducto: any[] = [];
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private ServiceService: ServiceService,
    private router: Router,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerCategorias();
    this.obtenerEstadosProducto();
  }

  transformUrl(url: string): string {
    if (url) {
      return 'assets/' + url.replace(/\\/g, '/');
    }
    return 'assets/uploads/Blog.png';
  }

  obtenerCategorias() {
    console.log('Obteniendo categorías...');
    this.ServiceService.getCategorias().subscribe(
      (data) => {
        console.log('Categorías obtenidas:', data);
        this.categorias = data;
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
        this.estadosProducto = data;
      },
      (error) => {
        console.error('Error al obtener estados de producto:', error);
      }
    );
  }



  subirProducto() {

    const formData = new FormData();
    formData.append('titulo', this.newProduct.titulo);
    formData.append('descripcion', this.newProduct.descripcion);
    formData.append('precio', this.newProduct.precio);
    formData.append('categoria', this.newProduct.categoria);
    formData.append('estado', this.newProduct.estado);

    const userEmail = this.AuthService.getUserEmailFromLocalStorage();
    if (userEmail) {
      formData.append('correo', userEmail);
    } else {
      console.error('Correo del usuario no encontrado en el localStorage.');
      return;
    }

    if (this.imagenOpcionalFile) {
      formData.append(
        'imagenOpcional',
        this.imagenOpcionalFile,
        this.imagenOpcionalFile.name
      );
    }

    this.ServiceService.subirProducto(formData).subscribe(
      (response: any) => {
        console.log('Producto creado exitosamente:', response);
        this.newsList.unshift(response);
        this.resetNewProductForm();
      },
      (error: any) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

  onFileSelected(event: any) {
    console.log('Archivo seleccionado:', event.target.files[0]);
    this.imagenOpcionalFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };


  }

  resetNewProductForm() {
    console.log('Reseteando formulario de nuevo producto');
    this.newProduct = {
      titulo: '',
      descripcion: '',
      precio: '',
      imagenOpcional: null,
    };
    this.imageFile = null;
  }

}
