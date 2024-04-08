import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SergioRoutingModule } from './sergio-routing.module';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { WeUsComponent } from './we-us/we-us.component';
import { EdidProductsComponent } from './edid-products/edid-products.component';

@NgModule({
  declarations: [
    LoginComponent,
    ContactanosComponent,
    WeUsComponent,
    EdidProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SergioRoutingModule
  ]
})
export class SergioModule { }
