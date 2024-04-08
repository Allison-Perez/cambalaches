import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NicolasRoutingModule } from './nicolas-routing.module';
import { UsersComponent } from './users/users.component';
import { AddProductsComponent } from './add-products/add-products.component';

@NgModule({
  declarations: [
    IndexComponent,
    UsersComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NicolasRoutingModule
  ]
})
export class NicolasModule { }
