import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ContactanosComponent } from './contactanos/contactanos.component';
import { WeUsComponent } from './we-us/we-us.component';
import { EdidProductsComponent } from './edid-products/edid-products.component';

const routes: Routes = [
  { path: "editarproductos", component: EdidProductsComponent },
  { path: "nosotros", component: WeUsComponent },
  { path: "contactanos", component: ContactanosComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SergioRoutingModule { }
