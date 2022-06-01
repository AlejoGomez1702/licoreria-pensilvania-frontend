import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewNaturistComponent } from './pages/create/establishment-naturist/new-naturist/new-naturist.component';
import { NewSexShopComponent } from './pages/create/establishment-naturist/new-sex-shop/new-sex-shop.component';
import { NewCigaretteComponent } from './pages/create/establishment-spirit/new-cigarette/new-cigarette.component';
import { NewDrinkComponent } from './pages/create/establishment-spirit/new-drink/new-drink.component';
import { NewGroceryComponent } from './pages/create/establishment-spirit/new-grocery/new-grocery.component';
import { NewSpiritComponent } from './pages/create/establishment-spirit/new-spirit/new-spirit.component';
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
  // /dashboard/products/create/spirits
  {
    path: 'create/spirits',
    component: NewSpiritComponent
  },
  {
    path: 'create/cigarettes',
    component: NewCigaretteComponent
  },
  {
    path: 'create/drinks',
    component: NewDrinkComponent
  },
  {
    path: 'create/groceries',
    component: NewGroceryComponent
  },
  {
    path: 'create/naturists',
    component: NewNaturistComponent
  },
  {
    path: 'create/sexshops',
    component: NewSexShopComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
