import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { MenuItem } from '../../interfaces/MenuItem';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit 
{

  public menu: MenuItem[][] = [
    [ // De a 6 elementos pinto
      {
        img: 'assets/images/sale-icon.svg',
        name: 'Ventas',
        route: appRoutes.listAllSales
      },
      {
        img: 'assets/images/purchase-icon.svg',
        name: 'Compras',
        route: appRoutes.listAllPurchases
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
    ],
    // [ // De a 6 elementos pinto
    //   {
    //     img: 'assets/images/setting-icon.svg',
    //     name: 'Ajustes',
    //     route: appRoutes.settings
    //   }
    // ]
  ];

  constructor(
    private router: Router
  ) 
  { }

  ngOnInit(): void 
  { }

  goToRoute(menuIndex: number, subMenuIndex: number)
  {
    const route: string = this.menu[menuIndex][subMenuIndex]?.route;
    this.router.navigate([route]);
  }

}
