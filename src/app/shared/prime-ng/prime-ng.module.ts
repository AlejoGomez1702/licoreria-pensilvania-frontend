import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OrderListModule} from 'primeng/orderlist';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule, InputTextModule, ToggleButtonModule, InputNumberModule,
    AutoCompleteModule, OrderListModule, MessagesModule, MessageModule,
    CalendarModule
  ],
  exports: [
    ButtonModule, InputTextModule, ToggleButtonModule, InputNumberModule,
    AutoCompleteModule, OrderListModule, MessagesModule, MessageModule,
    CalendarModule
  ]
})
export class PrimeNgModule { }
