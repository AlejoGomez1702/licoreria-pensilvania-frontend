import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ADMIN_LAYOUT } from './routes/admin-layout-routes';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { IndexComponent } from './shared/index/index.component';
import { ContactComponent } from './shared/index/pages/contact/contact.component';
import { ListAllProductsComponent } from './shared/index/pages/list-all-products/list-all-products.component';
import { ShoppingCartComponent } from './shared/index/pages/shopping-cart/shopping-cart.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  // Rutas de Licorería Pensilvania:
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
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },

  // Autenticación
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    component: AdminLayoutComponent,
    children: ADMIN_LAYOUT
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
