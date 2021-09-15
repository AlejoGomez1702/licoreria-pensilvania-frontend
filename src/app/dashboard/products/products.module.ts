import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CreateProductDialogComponent } from './components/create-product-dialog/create-product-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
  declarations: [
    ListAllComponent,
    CreateProductDialogComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
