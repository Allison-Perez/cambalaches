import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component'; 
import { SebastianRoutingModule } from './sebastian-routing.module';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    RegisterComponent,
    CartComponent,
    HomeComponent,
    LogoutComponent,
    ProductsComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SebastianRoutingModule,
  ]
})
export class SebastianModule { }
