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
import { GroceryInventoryComponent } from './components/grocery-inventory/grocery-inventory.component';
import { NewCigaretteComponent } from './pages/create/new-cigarette/new-cigarette.component';
import { CigaretteComponent } from './pages/edit/cigarette/cigarette.component';
import { NewDrinkComponent } from './pages/create/new-drink/new-drink.component';
import { DrinkComponent } from './pages/edit/drink/drink.component';
import { GroceryComponent } from './pages/edit/grocery/grocery.component';
import { NewGroceryComponent } from './pages/create/new-grocery/new-grocery.component';

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
    DrinkInventoryComponent,
    GroceryInventoryComponent,
    NewCigaretteComponent,
    CigaretteComponent,
    NewDrinkComponent,
    DrinkComponent,
    GroceryComponent,
    NewGroceryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
