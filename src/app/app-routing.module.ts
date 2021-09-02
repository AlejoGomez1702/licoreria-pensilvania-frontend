import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADMIN_LAYOUT } from './routes/admin-layout-routes';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { IndexComponent } from './shared/index/index.component';
import { ContactComponent } from './shared/index/pages/contact/contact.component';
import { ListAllProductsComponent } from './shared/index/pages/list-all-products/list-all-products.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'products',
    component: ListAllProductsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: ADMIN_LAYOUT
  },
  // {
  //   path: 'heroes',
  //   loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule )
  // },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
