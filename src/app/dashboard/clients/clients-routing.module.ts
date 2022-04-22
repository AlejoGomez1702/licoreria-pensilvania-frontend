import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAllClientsComponent } from './pages/list-all-clients/list-all-clients.component';

const routes: Routes = [
  {
    path: '',
    component: ListAllClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
