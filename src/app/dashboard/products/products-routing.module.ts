import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSpiritComponent } from './pages/create/new-spirit/new-spirit.component';
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
  // /dashboard/products/create
  {
    path: 'spirits/create',
    component: NewSpiritComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
