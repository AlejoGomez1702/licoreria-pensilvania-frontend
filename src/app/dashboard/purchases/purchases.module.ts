import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { ListAllPurchasesComponent } from './pages/list-all-purchases/list-all-purchases.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatePurchasesComponent } from './pages/create-purchases/create-purchases.component';
import { PurchaseTableComponent } from './components/purchase-table/purchase-table.component';


@NgModule({
  declarations: [
    ListAllPurchasesComponent,
    CreatePurchasesComponent,
    PurchaseTableComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    SharedModule
  ]
})
export class PurchasesModule { }
