import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { SmallHeaderComponent } from './index/components/small-header/small-header.component';
import { MainHeaderComponent } from './index/components/main-header/main-header.component';
import { MainBannerComponent } from './index/components/main-banner/main-banner.component';
import { RootContentComponent } from './index/components/root-content/root-content.component';
import { CategoriesSectionComponent } from './index/components/categories-section/categories-section.component';
import { ProductsSectionComponent } from './index/components/products-section/products-section.component';
import { AlcoholBannerComponent } from './index/components/alcohol-banner/alcohol-banner.component';
import { FooterComponent } from './index/components/footer/footer.component';
import { LoaderComponent } from './index/components/loader/loader.component';
import { MaterialModule } from './material/material.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { CrudDialogComponent } from './crud-dialog/crud-dialog.component';
import { AdDirective } from './directives/ad-component.directive';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormUnidadComponent } from '../dashboard/settings/components/crud-unidades-medida/form-unidad/form-unidad.component';
import { SpinnerModule } from './spinner/spinner.module';
import { ListAllProductsComponent } from './index/pages/list-all-products/list-all-products.component';
import { ContactComponent } from './index/pages/contact/contact.component';
import { FabCartComponent } from './index/components/fab-cart/fab-cart.component';
import { ShoppingCartComponent } from './index/pages/shopping-cart/shopping-cart.component';
import { ShoppingCartHeaderComponent } from './index/components/main-header/shopping-cart-header/shopping-cart-header.component';
import { NgChartsModule } from 'ng2-charts';
import { MainToolbarComponent } from '../dashboard/components/main-toolbar/main-toolbar.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    // Components
    IndexComponent,
    SmallHeaderComponent,
    MainHeaderComponent,
    MainBannerComponent,
    RootContentComponent,
    CategoriesSectionComponent,
    ProductsSectionComponent,
    AlcoholBannerComponent,
    FooterComponent,
    LoaderComponent,
    ErrorPageComponent,
    AdminLayoutComponent,
    CrudDialogComponent,
    AdDirective,
    ConfirmComponent,
    ListAllProductsComponent,
    ContactComponent,
    FabCartComponent,
    ShoppingCartComponent,
    ShoppingCartHeaderComponent,
    MainToolbarComponent

    // Modules
    // MaterialModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    NgChartsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    // Components
    IndexComponent,
    SmallHeaderComponent,
    MainHeaderComponent,
    RootContentComponent,
    CategoriesSectionComponent,
    ProductsSectionComponent,
    AlcoholBannerComponent,
    FooterComponent,
    LoaderComponent,
    AdminLayoutComponent,
    MainToolbarComponent,
    AdDirective,
    SpinnerModule,
    NgChartsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [FormUnidadComponent],

})
export class SharedModule { }
