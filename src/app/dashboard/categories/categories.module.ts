import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    ListAllComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule
  ]
})
export class CategoriesModule { }
