import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { MenuItem } from '../../interfaces/MenuItem';
// import { RuntimeCompiler} from '@angular/compiler';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit 
{
  public menu: MenuItem[] = [
    {
      img: 'assets/images/sale-icon.svg',
      name: 'Ventas',
      route: appRoutes.listAllSales,
      rol: 'ADMIN_ROLE'
    },
    {
      img: 'assets/images/purchase-icon.svg',
      name: 'Compras',
      route: appRoutes.listAllPurchases,
      rol: 'ADMIN_ROLE'
    },
    {
      img: 'assets/images/liquor-icon.svg',
      name: 'Inventario',
      route: appRoutes.inventory
    },
    {
      img: 'assets/images/provider-icon.svg',
      name: 'Proveedores',
      route: appRoutes.listAllProviders
    },
    {
      img: 'assets/images/client-icon.svg',
      name: 'Clientes',
      route: appRoutes.listAllClients
    },
    {
      img: 'assets/images/box-icon.svg',
      name: 'Caja',
      route: appRoutes.box
    }
  ];

  constructor(
    // private compiler: Compiler,
    private router: Router
  ) 
  { }

  ngOnInit(): void 
  { 
    // this.compiler.clearCache();
  }

  goToRoute( route: string )
  {
    this.router.navigate([route]);
  }

}
