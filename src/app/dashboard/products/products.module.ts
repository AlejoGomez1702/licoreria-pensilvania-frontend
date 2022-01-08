import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpiritInventoryComponent } from './components/spirit-inventory/spirit-inventory.component';
import { NewSpiritComponent } from './pages/create/new-spirit/new-spirit.component';
import { DialogProductComponent } from './pages/create/new-spirit/dialog-product/dialog-product.component';
import { SpiritComponent } from './pages/edit/spirit/spirit.component';
import { CigaretteInventoryComponent } from './components/cigarette-inventory/cigarette-inventory.component';
import { ProductNamePipe } from './pipes/product-name.pipe';
import { UnitDetailPipe } from './pipes/unit-detail.pipe';
import { DrinkInventoryComponent } from './components/drink-inventory/drink-inventory.component';

@NgModule({
  declarations: [
    ListAllComponent,
    SpiritInventoryComponent,
    NewSpiritComponent,
    DialogProductComponent,
    SpiritComponent,
    CigaretteInventoryComponent,
    ProductNamePipe,
    UnitDetailPipe,
    DrinkInventoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
