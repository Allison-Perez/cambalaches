import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NicolasRoutingModule } from './nicolas-routing.module';
import { UsersComponent } from './users/users.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin/admin.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';


@NgModule({
  declarations: [
    IndexComponent,
    UsersComponent,
    AddProductsComponent,
    NavComponent,
    AdminComponent,
    AdminEstadisticasComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NicolasRoutingModule
  ]
})
export class NicolasModule { }
