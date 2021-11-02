import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import {MatSnackBar} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    // MatSnackBar
  ]
})
export class SalesModule { }
