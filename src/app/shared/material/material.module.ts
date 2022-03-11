import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxCurrencyModule } from 'ngx-currency';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatRadioModule, MatSidenavModule, MatIconModule, MatToolbarModule,
    MatDividerModule, MatListModule, MatExpansionModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatTabsModule,
    MatCardModule, MatSelectModule, MatChipsModule, MatAutocompleteModule, MaterialFileInputModule, 
    MatProgressBarModule, NgxCurrencyModule, MatButtonToggleModule, MatBadgeModule, MatDatepickerModule,
    MatNativeDateModule, MatMenuModule, MatSlideToggleModule
  ],
  exports: [
    MatButtonModule, MatRadioModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatDividerModule,
    MatListModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
    MatFormFieldModule, MatDialogModule, MatTabsModule, MatCardModule, MatSelectModule, MatChipsModule, 
    MatAutocompleteModule, MaterialFileInputModule, MatProgressBarModule, NgxCurrencyModule, MatButtonToggleModule, 
    MatBadgeModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatSlideToggleModule
  ]
})
export class MaterialModule { }
