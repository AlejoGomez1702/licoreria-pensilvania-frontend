import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { StylesComponent } from './index/styles/styles.component';
import { ScriptsComponent } from './index/scripts/scripts.component';



@NgModule({
  declarations: [
    IndexComponent,
    StylesComponent,
    ScriptsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
