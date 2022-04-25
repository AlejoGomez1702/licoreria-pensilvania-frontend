import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxRoutingModule } from './box-routing.module';
import { BoxPanelComponent } from './pages/box-panel/box-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovementDialogComponent } from './components/movement-dialog/movement-dialog.component';


@NgModule({
  declarations: [
    BoxPanelComponent,
    MovementDialogComponent
  ],
  imports: [
    CommonModule,
    BoxRoutingModule,
    SharedModule
  ]
})
export class BoxModule { }
