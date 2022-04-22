import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListAllClientsComponent } from './pages/list-all-clients/list-all-clients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewClientDialogComponent } from './components/new-client-dialog/new-client-dialog.component';
import { BlankSpacePipe } from './pipes/blank-space.pipe';


@NgModule({
  declarations: [
    ListAllClientsComponent,
    NewClientDialogComponent,
    BlankSpacePipe
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule
  ]
})
export class ClientsModule { }
