import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "cart", component: CartComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent, pathMatch: "full"},
  { path: "logout", component: LogoutComponent, pathMatch: "full" },
  { path: "products", component: ProductsComponent, pathMatch: "full" },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SebastianRoutingModule { }
