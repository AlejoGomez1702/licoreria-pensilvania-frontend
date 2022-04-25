import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxRoutingModule } from './box-routing.module';
import { BoxPanelComponent } from './pages/box-panel/box-panel.component';


@NgModule({
  declarations: [
    BoxPanelComponent
  ],
  imports: [
    CommonModule,
    BoxRoutingModule
  ]
})
export class BoxModule { }
