import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAllSalesPurchasesComponent } from './pages/list-all-sales-purchases/list-all-sales-purchases.component';

const routes: Routes = [
  {
    path: '',
    component: ListAllSalesPurchasesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesVsPurchasesRoutingModule { }
