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

    // Modules
    // MaterialModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
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
    AdminLayoutComponent
  ]
})
export class SharedModule { }
