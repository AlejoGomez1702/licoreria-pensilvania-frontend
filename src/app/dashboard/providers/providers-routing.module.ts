import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersListComponent } from './pages/providers-list/providers-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
