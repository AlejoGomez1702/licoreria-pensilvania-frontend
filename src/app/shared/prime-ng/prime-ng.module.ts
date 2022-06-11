import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule, InputTextModule, ToggleButtonModule, InputNumberModule
  ],
  exports: [
    ButtonModule, InputTextModule, ToggleButtonModule, InputNumberModule
  ]
})
export class PrimeNgModule { }
