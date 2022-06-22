import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpiritComponent } from './pages/edit/establishment-spirit/spirit/spirit.component';
import { ProductNamePipe } from './pipes/product-name.pipe';
import { CigaretteComponent } from './pages/edit/establishment-spirit/cigarette/cigarette.component';
import { DrinkComponent } from './pages/edit/establishment-spirit/drink/drink.component';
import { GroceryComponent } from './pages/edit/establishment-spirit/grocery/grocery.component';
import { SpiritInventoryComponent } from './components/establishment-spirit/spirit-inventory/spirit-inventory.component';
import { CigaretteInventoryComponent } from './components/establishment-spirit/cigarette-inventory/cigarette-inventory.component';
import { DrinkInventoryComponent } from './components/establishment-spirit/drink-inventory/drink-inventory.component';
import { GroceryInventoryComponent } from './components/establishment-spirit/grocery-inventory/grocery-inventory.component';
import { NaturistInventoryComponent } from './components/establishment-naturist/naturist-inventory/naturist-inventory.component';
import { SexShopInventoryComponent } from './components/establishment-naturist/sex-shop-inventory/sex-shop-inventory.component';
import { NaturistComponent } from './pages/edit/establishment-naturist/naturist/naturist.component';
import { SexShopComponent } from './pages/edit/establishment-naturist/sex-shop/sex-shop.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { NewProductComponent } from './pages/create/new-product/new-product.component';
import { ProductTypePipe } from './pipes/product-type.pipe';

@NgModule({
  declarations: [
    ListAllComponent,
    SpiritInventoryComponent,
    SpiritComponent,
    CigaretteInventoryComponent,
    ProductNamePipe,
    DrinkInventoryComponent,
    GroceryInventoryComponent,
    CigaretteComponent,
    DrinkComponent,
    GroceryComponent,
    NaturistInventoryComponent,
    SexShopInventoryComponent,
    NaturistComponent,
    SexShopComponent,
    ProductInventoryComponent,
    NewProductComponent,
    ProductTypePipe,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
