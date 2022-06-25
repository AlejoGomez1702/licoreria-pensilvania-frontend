import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule, InputTextModule, ToggleButtonModule, InputNumberModule,
    AutoCompleteModule, OrderListModule
  ],
  exports: [
    ButtonModule, InputTextModule, ToggleButtonModule, InputNumberModule,
    AutoCompleteModule, OrderListModule
  ]
})
export class PrimeNgModule { }
