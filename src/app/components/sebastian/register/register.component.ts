// register.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  tipoDocumento: string | undefined;
  numeroDocumento: string | undefined;
  nombre: string | undefined;
  apellido: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  register() {
    // Aquí iría la lógica para registrar al usuario
    console.log('Registro de usuario:', {
      tipoDocumento: this.tipoDocumento,
      numeroDocumento: this.numeroDocumento,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password
    });
  }
}
