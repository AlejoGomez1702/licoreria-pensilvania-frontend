import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAllProvidersComponent } from './pages/list-all-providers/list-all-providers.component';
import { BlankSpacePipe } from './pipes/blank-space.pipe';
import { NewProviderDialogComponent } from './components/new-provider-dialog/new-provider-dialog.component';


@NgModule({
  declarations: [
    ListAllProvidersComponent,
    BlankSpacePipe,
    NewProviderDialogComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class ProvidersModule { }
