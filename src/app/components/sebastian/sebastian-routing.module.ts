import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: "cart", component: CartComponent},
  { path: "home", component: HomeComponent},
  { path: "logout", component: LogoutComponent},
  { path: "products", component: ProductsComponent},
  {path: "registro", component: RegisterComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SebastianRoutingModule { }
