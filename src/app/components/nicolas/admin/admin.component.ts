import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  usuarios: any[] = [];
  originalUsuarios: any[] = [];
  filtroNombre: string | null = null;
  filtroDocumento: number | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private serviceService: ServiceService, private fb: FormBuilder) {}

  aplicarFiltros() {
    let usuariosFiltrados = this.originalUsuarios.slice();

    usuariosFiltrados = usuariosFiltrados.filter((usuario) => {

      const cumpleFiltroNombre =
        !this.filtroNombre || usuario.primerNombre.includes(this.filtroNombre);
      const cumpleFiltroDocumento =
        !this.filtroDocumento || usuario.documento === this.filtroDocumento;

      return cumpleFiltroNombre && cumpleFiltroDocumento;
    });

    this.usuarios = usuariosFiltrados;

    console.log('Usuarios después de aplicar filtros:', this.usuarios);
  }

  limpiarFiltros() {
    this.usuarios = this.originalUsuarios.slice();
    this.filtroNombre = null;
    this.filtroDocumento = null;
  }

  ngOnInit(): void {
    this.serviceService.getAllUsuarios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.originalUsuarios = data.slice();
          this.usuarios = data;

          const miArreglo = data;
          miArreglo.map((usuario) => {
            usuario['editar'] = false;
          });

          this.usuarios = data;
          console.log(this.usuarios);
          this.aplicarFiltros();
        },
        (error) => {
          console.error('Error al cargar usuarios:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
