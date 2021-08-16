import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { SmallHeaderComponent } from './index/small-header/small-header.component';
import { MainHeaderComponent } from './index/main-header/main-header.component';
import { MainBannerComponent } from './index/main-banner/main-banner.component';
import { RootContentComponent } from './index/root-content/root-content.component';
import { CategoriesSectionComponent } from './index/categories-section/categories-section.component';
import { ProductsSectionComponent } from './index/products-section/products-section.component';
import { AlcoholBannerComponent } from './index/alcohol-banner/alcohol-banner.component';
import { FooterComponent } from './index/footer/footer.component';
import { LoaderComponent } from './index/loader/loader.component';

@NgModule({
  declarations: [
    IndexComponent,
    SmallHeaderComponent,
    MainHeaderComponent,
    MainBannerComponent,
    RootContentComponent,
    CategoriesSectionComponent,
    ProductsSectionComponent,
    AlcoholBannerComponent,
    FooterComponent,
    LoaderComponent
    // StylesComponent,
  ],
  imports: [
    CommonModule,
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
    LoaderComponent
  ]
})
export class SharedModule { }
