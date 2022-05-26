import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCigaretteComponent } from './pages/create/establishment-spirit/new-cigarette/new-cigarette.component';
import { NewDrinkComponent } from './pages/create/establishment-spirit/new-drink/new-drink.component';
import { NewGroceryComponent } from './pages/create/establishment-spirit/new-grocery/new-grocery.component';
import { NewSpiritComponent } from './pages/create/establishment-spirit/new-spirit/new-spirit.component';
import { CigaretteComponent } from './pages/edit/cigarette/cigarette.component';
import { DrinkComponent } from './pages/edit/drink/drink.component';
import { GroceryComponent } from './pages/edit/grocery/grocery.component';
import { SpiritComponent } from './pages/edit/spirit/spirit.component';
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
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
