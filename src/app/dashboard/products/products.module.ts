import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpiritInventoryComponent } from './components/spirit-inventory/spirit-inventory.component';
import { NewSpiritComponent } from './pages/create/new-spirit/new-spirit.component';
import { DialogProductComponent } from './pages/create/new-spirit/dialog-product/dialog-product.component';
import { SpiritComponent } from './pages/edit/spirit/spirit.component';

@NgModule({
  declarations: [
    ListAllComponent,
    SpiritInventoryComponent,
    NewSpiritComponent,
    DialogProductComponent,
    SpiritComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
