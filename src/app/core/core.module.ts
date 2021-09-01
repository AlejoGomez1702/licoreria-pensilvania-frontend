import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SpinnerInterceptor } from '../shared/spinner/interceptors/spinner.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './providers/paginator-intl';
// import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    // MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class CoreModule { }
