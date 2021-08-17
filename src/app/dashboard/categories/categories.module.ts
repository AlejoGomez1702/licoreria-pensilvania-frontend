import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListAllComponent } from './pages/list-all/list-all.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CreateCategoryDialogComponent } from './components/create-category-dialog/create-category-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListAllComponent,
    CreateCategoryDialogComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CategoriesModule { }
