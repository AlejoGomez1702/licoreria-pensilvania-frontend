import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewSpiritComponent } from './pages/create/establishment-spirit/new-spirit/new-spirit.component';
import { DialogProductComponent } from './pages/create/establishment-spirit/new-spirit/dialog-product/dialog-product.component';
import { SpiritComponent } from './pages/edit/establishment-spirit/spirit/spirit.component';
import { ProductNamePipe } from './pipes/product-name.pipe';
import { UnitDetailPipe } from './pipes/unit-detail.pipe';
import { NewCigaretteComponent } from './pages/create/establishment-spirit/new-cigarette/new-cigarette.component';
import { CigaretteComponent } from './pages/edit/establishment-spirit/cigarette/cigarette.component';
import { NewDrinkComponent } from './pages/create/establishment-spirit/new-drink/new-drink.component';
import { DrinkComponent } from './pages/edit/establishment-spirit/drink/drink.component';
import { GroceryComponent } from './pages/edit/establishment-spirit/grocery/grocery.component';
import { NewGroceryComponent } from './pages/create/establishment-spirit/new-grocery/new-grocery.component';
import { SpiritInventoryComponent } from './components/establishment-spirit/spirit-inventory/spirit-inventory.component';
import { CigaretteInventoryComponent } from './components/establishment-spirit/cigarette-inventory/cigarette-inventory.component';
import { DrinkInventoryComponent } from './components/establishment-spirit/drink-inventory/drink-inventory.component';
import { GroceryInventoryComponent } from './components/establishment-spirit/grocery-inventory/grocery-inventory.component';
import { NaturistInventoryComponent } from './components/establishment-naturist/naturist-inventory/naturist-inventory.component';
import { SexShopInventoryComponent } from './components/establishment-naturist/sex-shop-inventory/sex-shop-inventory.component';
import { NewNaturistComponent } from './pages/create/establishment-naturist/new-naturist/new-naturist.component';
import { NewSexShopComponent } from './pages/create/establishment-naturist/new-sex-shop/new-sex-shop.component';
import { NaturistComponent } from './pages/edit/establishment-naturist/naturist/naturist.component';
import { SexShopComponent } from './pages/edit/establishment-naturist/sex-shop/sex-shop.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';

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
    NewGroceryComponent,
    NaturistInventoryComponent,
    SexShopInventoryComponent,
    NewNaturistComponent,
    NewSexShopComponent,
    NaturistComponent,
    SexShopComponent,
    ProductInventoryComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
