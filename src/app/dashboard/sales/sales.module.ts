import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleTableComponent } from './components/sale-table/sale-table.component';
import { ListAllSalesComponent } from './pages/list-all-sales/list-all-sales.component';
import { BarGraphComponent } from './components/graphs/bar-graph/bar-graph.component';
import { ChangePriceDialogComponent } from './components/sale-table/change-price-dialog/change-price-dialog.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';
import { CashSaleDialogComponent } from './components/cash-sale-dialog/cash-sale-dialog.component';
import { SecondPriceDialogComponent } from './components/sale-table/second-price-dialog/second-price-dialog.component';
import { ChangeCountDialogComponent } from './components/sale-table/change-count-dialog/change-count-dialog.component';
// import {MatSnackBar} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CreateComponent,
    SaleTableComponent,
    ListAllSalesComponent,
    BarGraphComponent,
    ChangePriceDialogComponent,
    SaleDetailComponent,
    CashSaleDialogComponent,
    SecondPriceDialogComponent,
    ChangeCountDialogComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    // MatSnackBar
  ]
})
export class SalesModule { }
