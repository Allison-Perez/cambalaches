import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permite la navegación si el usuario está autenticado
    } else {
      this.router.navigateByUrl('/login'); // Redirige al usuario al componente de inicio de sesión si no está autenticado
      return false; // Bloquea la navegación
    }
  }
}
