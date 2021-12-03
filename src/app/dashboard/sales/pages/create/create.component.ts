import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, Store } from '@ngrx/store';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SpiritService } from 'src/app/dashboard/products/services/spirit.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { AddProductAction, ClearCartAction, RemoveProductAction } from '../../redux/shopping-cart.actions';
import { ShoppingCartState } from '../../redux/ShoppingCartState';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit 
{
  public countSales: number = 1;
  public tabs: string[] = ['Venta #1'];
  public selected: FormControl = new FormControl(0);

  // Productos agregados a la venta.
  public products: Product[] = [];
  // Poductos resultados de una busqueda.
  public filteredProducts: Product[] = [];
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: string = '';
  // Si el carrito de compras esta vacio o no.
  public isEmpty: boolean = false;

  constructor(
    private store: Store<ShoppingCartState>, // Redux
    private spiritService: SpiritService,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,    
    private sweetAlert: SweetAlertService
  ) 
  { 
    // Redux:
    this.store.subscribe(
      state => console.log(state)
    );
  }

  ngOnInit(): void 
  {
    this.verifySnack();
  }

  get isEmptyCart()
  {
    return this.products.length === 0;
  }

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

  async verifyControlTab()
  {    
    const indexSelected = this.selected.value;

    if(indexSelected === (this.tabs.length)) // Si se desea agregar una nueva venta en paralelo.
    {
      this.addTab();

      // REDUX:
      this.store.dispatch( new AddProductAction() );
    }

    if(indexSelected === (this.tabs.length + 1)) // Si se quieren borrar las ventas en paralelo.
    {
      // Eliminar el historial de ventas (Eliminar todos los tabs, solo dejar uno).
      const { isConfirmed } = await this.sweetAlert.presentDelete('Las pestañas de ventas creadas!');
      if(isConfirmed)
      {
        this.tabs = ['Venta #1'];
        this.selected.setValue(0);
        this.countSales = 1;

        // REDUX:
        this.store.dispatch( new ClearCartAction() );
      }
      else
      {
        this.selected.setValue(indexSelected - 2);
      }
    }
  }

  addTab() {
    this.countSales ++;
    this.tabs.push('Venta #' + this.countSales);    
    this.selected.setValue(this.tabs.length - 1);
  }

  // removeTab(index: number) {
  //   this.tabs.splice(index, 1);
  // }

}
