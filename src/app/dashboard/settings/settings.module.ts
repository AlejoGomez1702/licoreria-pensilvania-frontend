import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CreateCategoryDialogComponent } from './components/create-category-dialog/create-category-dialog.component';
import { FormsModule } from '@angular/forms';
import { CrudCategoryComponent } from './components/crud-category/crud-category.component';
import { CrudUnidadesMedidaComponent } from './components/crud-unidades-medida/crud-unidades-medida.component';
import { CrudAlcoholComponent } from './components/crud-alcohol/crud-alcohol.component';
import { FormUnidadComponent } from './components/crud-unidades-medida/form-unidad/form-unidad.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';
import { FormAlcoholComponent } from './components/crud-alcohol/form-alcohol/form-alcohol.component';


@NgModule({
  declarations: [
    ListAllComponent,
    CreateCategoryDialogComponent,
    CrudCategoryComponent,
    CrudUnidadesMedidaComponent,
    CrudAlcoholComponent,
    FormUnidadComponent,
    FormAlcoholComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
  ],
  entryComponents: [FormUnidadComponent],
  providers: [
    CrudService
 ],

})
export class SettingsModule { }
