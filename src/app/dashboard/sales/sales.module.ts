import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleTableComponent } from './components/sale-table/sale-table.component';
import { ListAllSalesComponent } from './pages/list-all-sales/list-all-sales.component';
// import {MatSnackBar} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CreateComponent,
    SaleTableComponent,
    ListAllSalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    // MatSnackBar
  ]
})
export class SalesModule { }