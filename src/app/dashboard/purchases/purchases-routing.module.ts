import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePurchasesComponent } from './pages/create-purchases/create-purchases.component';
import { ListAllPurchasesComponent } from './pages/list-all-purchases/list-all-purchases.component';

const routes: Routes = [
  // /dashboard/purchases
  {
    path: '',
    component: ListAllPurchasesComponent
  },
  // /dashboard/purchases/create
  {
    path: 'create',
    component: CreatePurchasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
