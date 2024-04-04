import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sergio', loadChildren: () => import('./components/sergio/sergio.module').then(m => m.SergioModule) },
  { path: 'nicolas', loadChildren: () => import('./components/nicolas/nicolas.module').then(m => m.NicolasModule)},
  { path: 'sebastian', loadChildren: () => import('./components/sebastian/sebastian.module').then(m => m.SebastianModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
