import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';


@NgModule({
  declarations: [
    MainContentComponent,
    MainPanelComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
