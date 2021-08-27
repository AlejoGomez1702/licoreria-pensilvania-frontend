import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CreateProductDialogComponent } from './components/create-product-dialog/create-product-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListAllComponent,
    CreateProductDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
