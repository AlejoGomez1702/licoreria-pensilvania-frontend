import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/auth/guards/admin.guard';
import { CreatePurchasesComponent } from './pages/create-purchases/create-purchases.component';
import { ListAllPurchasesComponent } from './pages/list-all-purchases/list-all-purchases.component';
import { PurchaseDetailComponent } from './pages/purchase-detail/purchase-detail.component';

const routes: Routes = [
  // /dashboard/purchases
  {
    path: '',
    component: ListAllPurchasesComponent,
    canLoad: [ AdminGuard ],
    canActivate: [ AdminGuard ]
  },
  // /dashboard/purchases/create
  {
    path: 'create',
    component: CreatePurchasesComponent
  },
  // /dashboard/purchases/show/:id
  {
    path: 'show/:id',
    component: PurchaseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
