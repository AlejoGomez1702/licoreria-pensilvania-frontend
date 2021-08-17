import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
