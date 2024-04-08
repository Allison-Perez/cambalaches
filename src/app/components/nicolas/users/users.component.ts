import { Component, OnInit  } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  productos: any[] = [];

constructor(
  private ServiceService: ServiceService,
  private AuthService: AuthService
) {}

ngOnInit(): void {
  const userEmail = this.AuthService.getUserEmail(); // Obtener el correo electrónico del usuario logueado
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
