import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router) { }

  logout(): void {
    // Aquí puedes agregar cualquier lógica necesaria para cerrar la sesión del usuario
    // Por ejemplo, eliminar el token de autenticación del almacenamiento local o de la sesión
    // Luego, redirigir al usuario a la página de inicio de sesión u otra página deseada
    // En este ejemplo, simplemente redirigimos al usuario a la página de inicio
    this.router.navigate(['index']);
  }

}
