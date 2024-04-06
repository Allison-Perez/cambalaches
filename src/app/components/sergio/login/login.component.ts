import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showAlert = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: ServiceService, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.showAlert = false;

      const formData = this.loginForm.value;

      this.http.login(formData).pipe(
        catchError(error => {
          console.error('Algo salió mal:', error);
          this.showAlert = true;
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          const email = this.loginForm.value.correo;
          localStorage.setItem('user_email', JSON.stringify(email));
          const userRole = response.idRol;
          const userInfo = response.userInfo;
          this.redirectToRoleView(userRole);
          this.authService.setAuthenticationStatus(true, userRole, userInfo);



        } else {
          console.error('Token no encontrado en la respuesta del servidor');
          this.showAlert = true;
        }
      });

    } else {
      this.showAlert = true;
    }
  }

  private redirectToRoleView(userRole: number): void {
    switch (userRole) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/home']);
        break;
      default:
        break;
    }
  }
}
