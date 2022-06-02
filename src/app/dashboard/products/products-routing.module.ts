import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './pages/create/new-product/new-product.component';
import { NaturistComponent } from './pages/edit/establishment-naturist/naturist/naturist.component';
import { SexShopComponent } from './pages/edit/establishment-naturist/sex-shop/sex-shop.component';
import { CigaretteComponent } from './pages/edit/establishment-spirit/cigarette/cigarette.component';
import { DrinkComponent } from './pages/edit/establishment-spirit/drink/drink.component';
import { GroceryComponent } from './pages/edit/establishment-spirit/grocery/grocery.component';
import { SpiritComponent } from './pages/edit/establishment-spirit/spirit/spirit.component';
import { ListAllComponent } from './pages/list-all/list-all.component';

const routes: Routes = [
  // /dashboard/products
  {
    path: '',
    component: ListAllComponent
  },
  // /dashboard/products/spirits/:id
  {
    path: 'spirits/:id'
  },
  // /dashboard/products/spirits/edit/:id
  {
    path: 'spirits/edit/:id',
    component: SpiritComponent
  },
  {
    path: 'cigarettes/edit/:id',
    component: CigaretteComponent
  },
  {
    path: 'drinks/edit/:id',
    component: DrinkComponent
  },
  {
    path: 'groceries/edit/:id',
    component: GroceryComponent
  },
  {
    path: 'naturists/edit/:id',
    component: NaturistComponent
  },
  {
    path: 'sexshops/edit/:id',
    component: SexShopComponent
  },
  // Crear un nuevo producto
  {
    path: 'create/:type',
    component: NewProductComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
