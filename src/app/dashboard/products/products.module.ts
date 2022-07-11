import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductNamePipe } from './pipes/product-name.pipe';
import { SpiritInventoryComponent } from './components/establishment-spirit/spirit-inventory/spirit-inventory.component';
import { CigaretteInventoryComponent } from './components/establishment-spirit/cigarette-inventory/cigarette-inventory.component';
import { DrinkInventoryComponent } from './components/establishment-spirit/drink-inventory/drink-inventory.component';
import { GroceryInventoryComponent } from './components/establishment-spirit/grocery-inventory/grocery-inventory.component';
import { NaturistInventoryComponent } from './components/establishment-naturist/naturist-inventory/naturist-inventory.component';
import { SexShopInventoryComponent } from './components/establishment-naturist/sex-shop-inventory/sex-shop-inventory.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { NewProductComponent } from './pages/create/new-product/new-product.component';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { CocktailInventoryComponent } from './components/establishment-spirit/cocktail-inventory/cocktail-inventory.component';
import { UpdateProductComponent } from './pages/edit/update-product/update-product.component';

@NgModule({
  declarations: [
    ListAllComponent,
    SpiritInventoryComponent,
    CigaretteInventoryComponent,
    ProductNamePipe,
    DrinkInventoryComponent,
    GroceryInventoryComponent,
    NaturistInventoryComponent,
    SexShopInventoryComponent,
    ProductInventoryComponent,
    NewProductComponent,
    ProductTypePipe,
    CocktailInventoryComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
