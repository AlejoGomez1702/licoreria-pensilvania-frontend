import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxPanelComponent } from './pages/box-panel/box-panel.component';

const routes: Routes = [
  {
    path: '',
    component: BoxPanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxRoutingModule { }
