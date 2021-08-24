import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent
  },
  {
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
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
