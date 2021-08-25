import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    MainContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
