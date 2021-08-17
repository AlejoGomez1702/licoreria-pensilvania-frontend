import { Routes } from '@angular/router';

export const ADMIN_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardModule )
    },
    // {
    //     path: 'product',
    //     loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
    // }
]