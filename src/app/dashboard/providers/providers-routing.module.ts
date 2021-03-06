import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAllProvidersComponent } from './pages/list-all-providers/list-all-providers.component';

const routes: Routes = [
  {
    path: '',
    component: ListAllProvidersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
