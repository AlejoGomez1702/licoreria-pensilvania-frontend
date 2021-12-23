import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ListAllSalesComponent } from './pages/list-all-sales/list-all-sales.component';

const routes: Routes = [
  // /dashboard/sales
  {
    path: '',
    component: ListAllSalesComponent
  },
  // /dashboard/sales/create
  {
    path: 'create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
