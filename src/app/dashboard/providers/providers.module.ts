import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersListComponent } from './pages/providers-list/providers-list.component';
import { CrudProvidersComponent } from './components/crud-providers/crud-providers.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormProviderComponent } from './components/crud-providers/form-provider/form-provider.component';


@NgModule({
  declarations: [
    ProvidersListComponent,
    CrudProvidersComponent,
    FormProviderComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
  ]
})
export class ProvidersModule { }
