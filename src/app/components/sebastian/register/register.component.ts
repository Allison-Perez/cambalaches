import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  infoUser = {};
  registerForm: FormGroup;
  showError: boolean = false;

  constructor(private http: ServiceService, private fb: FormBuilder, private router: Router){
    this.registerForm = this.fb.group({
      primerNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      tipo_documento: ['', Validators.required], // Aquí está definido como 'tipoDocumento'
      correo: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(){

    if (this.registerForm.valid) {
      this.showError = false;

      const formData = this.registerForm.value;

      this.http.register(formData).pipe(
        catchError(error => {
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.router.navigate(['/login']);
        }
      });

    } else {
      this.showError = true;
    }
  }
}
