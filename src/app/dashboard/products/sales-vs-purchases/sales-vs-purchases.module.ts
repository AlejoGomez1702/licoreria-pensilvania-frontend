import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesVsPurchasesRoutingModule } from './sales-vs-purchases-routing.module';
import { ListAllSalesPurchasesComponent } from './pages/list-all-sales-purchases/list-all-sales-purchases.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListAllSalesPurchasesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SalesVsPurchasesRoutingModule
  ]
})
export class SalesVsPurchasesModule { }
