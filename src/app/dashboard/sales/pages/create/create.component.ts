import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SpiritService } from 'src/app/dashboard/products/services/spirit.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { SaleService } from '../../services/sale.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
];

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit 
{
  // Productos agregados a la venta.
  public products: Product[] = [];
  // Poductos resultados de una busqueda.
  public filteredProducts: Product[] = [];
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: string = '';
  // Si el carrito de compras esta vacio o no.
  public isEmpty: boolean = false;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private spiritService: SpiritService,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,    
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void 
  {
    this.verifySnack();
  }

  get isEmptyCart()
  {
    return this.products.length === 0;
  }

  // openSnackBar() 
  // {
  //   // this._snackBar.open("Hola", "Bebe");
  //   this.isEmpty = !this.isEmpty;
  //   this._snackBar.dismiss();
  // }

  searchProduct()
  {
    // Si se esta buscando por código de barras.
    const isBarCode = Number( this.search );
    if(isBarCode)
    {
      this.searchByBarcode();
    } 
    else
    {
      this.searchByName();
    }
  }

  searchByBarcode()
  {
    this.filterService.searchProductByBarcode( this.search ).subscribe(
      product => {
        if(!product) // No se encontro producto
        {
          this.sweetAlert.presentError( 'No se encontro el producto' );
        }
        else
        {
          this.products.push( product );
          this.verifySnack();
        }
      },
      error => this.sweetAlert.presentError( error.msg )
    );
  }

  searchByName()
  {
    const term = this.search;
    if( term )
    {
      this.filterService.searchSpirits( term, false ).subscribe(
        spirits => {
          this.filteredProducts = spirits;
          console.log(spirits);
        },
        (error) => {
          console.log("Error buscando los productos");
          console.log(error);
        }
      );
    }
  }

  searchById( id: string )
  {
    this.spiritService.getSpiritById( id, false ).subscribe(
      spirit => {
        this.products.push( spirit );
        this.filteredProducts = [];
        this.verifySnack();
      },
      error => this.sweetAlert.presentError( 'Buscando Licor Por ID' )
    );
  }

  clearSearchData(): void
  {
    this.search = '';
    this.filteredProducts = [];
  }

  verifySnack()
  {
    if(this.products.length >= 1) // Hay productos
    {
      this._snackBar.dismiss();
    }
    else
    {
      this._snackBar.open("Carrito de compras vacío, AGREGUE PRODUCTOS!", "OK", {duration: 10000});
    }
  }

}
