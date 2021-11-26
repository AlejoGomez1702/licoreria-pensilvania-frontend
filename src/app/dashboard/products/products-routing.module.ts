import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { NewSpiritComponent } from './pages/create/new-spirit/new-spirit.component';
import { EditSpiritComponent } from './pages/edit-spirit/edit-spirit.component';
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
    component: EditSpiritComponent
  },
  // /dashboard/products/create
  {
    path: 'create/spirit',
    component: NewSpiritComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
