import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];

constructor(
  private ServiceService: ServiceService,
  private AuthService: AuthService

) {}

ngOnInit(): void {
  const userEmail = this.AuthService.getUserEmail();
  if (userEmail) {
    this.getProductsByEmail(userEmail);
  }
}

getProductsByEmail(email: string): void {
  this.ServiceService.getProductsByEmail(email).subscribe(
    (data) => {
      this.productos = data;
    },
    (error) => {
      console.error('Error al obtener los productos por correo:', error);
    }
  );

}
}
