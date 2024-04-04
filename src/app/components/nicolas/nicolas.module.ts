import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NicolasRoutingModule } from './nicolas-routing.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NicolasRoutingModule
  ]
})
export class NicolasModule { }
