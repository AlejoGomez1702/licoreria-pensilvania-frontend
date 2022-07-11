import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './pages/create/new-product/new-product.component';
import { UpdateProductComponent } from './pages/edit/update-product/update-product.component';
import { ListAllComponent } from './pages/list-all/list-all.component';

const routes: Routes = [
  // /dashboard/products
  {
    path: '',
    component: ListAllComponent
  },
  // Editar un producto
  {
    path: ':type/edit/:id',
    component: UpdateProductComponent
  },
  // Crear un nuevo producto
  {
    path: 'create/:type',
    component: NewProductComponent
  },
  // Ventas vs Compras  
  {
    path: 'purchasesvssales',
    loadChildren: () => import('./sales-vs-purchases/sales-vs-purchases.module').then( m => m.SalesVsPurchasesModule )
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
