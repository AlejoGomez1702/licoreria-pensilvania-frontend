import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';

const routes: Routes = [
  {
    path: '',
    component: MainPanelComponent
  },
  {
    // dashboard/products
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule )
  },
  {
    // dashboard/settings
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsModule )
  },
  {
    path: 'profile',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule )
  },
  {
    path: 'providers',
    loadChildren: () => import('./providers/providers.module').then( m => m.ProvidersModule )
  },  
  // dashboard/clients
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then( m => m.ClientsModule )
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then( m => m.SalesModule )
  },
  {
    path: 'purchases',
    loadChildren: () => import('./purchases/purchases.module').then( m => m.PurchasesModule )
  },
  {
    path: 'box',
    loadChildren: () => import('./box/box.module').then( m => m.BoxModule )
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
