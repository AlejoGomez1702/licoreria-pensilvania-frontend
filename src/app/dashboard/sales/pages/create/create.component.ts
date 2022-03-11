import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SearchService } from 'src/app/dashboard/products/services/search.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { SaleTableComponent } from '../../components/sale-table/sale-table.component';
import { CartItem } from '../../interfaces/CartItem';
import { SaleItemDetail } from '../../interfaces/SaleItemDetail';
import { CartService } from '../../services/cart.service';
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
  public products: CartItem[][] = [[]];
  // Poductos resultados de una busqueda.
  // public filteredProducts: Product[] = [];
  public filteredProducts!: Observable<Product[]>;
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: string = '';
  // Si el carrito de compras esta vacio o no.
  // public isEmpty: boolean = false;

  // *********** Permite actualizar la tabla de resumen de venta******************** ///
  @ViewChildren(SaleTableComponent) saleResumeTable!: QueryList<SaleTableComponent>;

  constructor(
    private saleService: SaleService,
    private searchService: SearchService,
    private cartService: CartService,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,    
    private sweetAlert: SweetAlertService
  ) 
  {}

  ngOnInit(): void 
  {    
    this.verifySnack();
    setTimeout(() => {
      this.loadPersistence();
    }, 400);
  }

  getFullProductName( product: Product )
  {
    return `${product.category.name} ${product.name} X ${product.unit.unit}`;
  }

  isEmpty(index: number): boolean
  {
    if(this.products[index] && this.products[index][0] )
    {
      return false; // No está vacio
    }

    return true; // Está vacio
  }

  loadPersistence(): void
  {
    const cart = this.cartService.getCart();
    if(cart && cart[0])
    {
      this.products = [cart[0]];
      for (let index = 0; index < this.products.length; index++) 
      {
        this.saleResumeTable.get(index)?.refreshData( this.products[index] );
      }
      this.cartService.refreshCart([this.products[0]]);
    }    
  }

  /**
   * Añade un producto buscado por nombre o código de barras.
   * @param product 
   */
  verifyAddCartProduct( product: Product )
  {
    const tabIndex = this.selected.value;

    const cartItem = this.addProductToCart( product );
    const indexProduct = this.products[tabIndex].findIndex( p => p.id === cartItem.id );
    // console.log('index product: ', indexProduct);
    if(indexProduct !== -1)
    {
      this.products[tabIndex][indexProduct].count ++;
    }
    else // findIndex retorno -1, quiere decir que no lo encontró.
    {
      this.products[tabIndex].push( cartItem );
    }
    
    this.refreshSaleResume(tabIndex);
  }

  markSecondPriceProduct( saleItemDetail: SaleItemDetail )
  {
    const { index, id } = saleItemDetail;

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      if(this.products[index][indexProduct].is_second_price)
      {
        this.products[index][indexProduct].sale_price = this.products[index][indexProduct].product.second_sale_price;
      }
      else
      {
        this.products[index][indexProduct].sale_price = this.products[index][indexProduct].product.sale_price;
      }
    }

    // Guardar la persistencia en el localStorage
    this.refreshSaleResume(this.selected.value);
  }

  removeCartItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id } = saleItemDetail;

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[index].splice(indexProduct);
    }

    this.refreshSaleResume(index);
  }

  plusCartItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id } = saleItemDetail;

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[index][indexProduct].count ++;
    }

    this.refreshSaleResume(index);
  }

  minusCartItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id } = saleItemDetail;

    console.log(saleItemDetail);

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      const count = this.products[index][indexProduct].count;
      if(!(count < 2)) //Solo hay un item agregado
      {
        this.products[index][indexProduct].count --;
      }
    }

    this.refreshSaleResume(index);
  }

  changePriceCartItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id, otherPrice = 0 } = saleItemDetail;

    console.log(saleItemDetail);

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[index][indexProduct].sale_price = otherPrice;
    }

    this.refreshSaleResume(index);
  }

  refreshSaleResume(index: number)
  {
    // Guardar la persistencia en el localStorage
    this.cartService.refreshCart(this.products);
    console.log("asi va el carrito de compras:");
    console.log(this.products);

    this.saleResumeTable.get(index)?.refreshData( this.products[index] );
    this.verifySnack();
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
      this.filteredProducts = this.searchService.searchProduct( this.search, '' ).pipe(
        map(products => (products ? products.results : [])),
      );

      // this.searchByName();
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
          this.verifyAddCartProduct( product );
        }
      },
      error => this.sweetAlert.presentError( error.msg )
    );
  }

  // searchByName()
  // {
  //   const term = this.search;
  //   if( term )
  //   {
  //     this.filterService.searchSpirits( term, false ).subscribe(
  //       spirits => {
  //         this.filteredProducts = spirits;
  //         console.log(spirits);
  //       },
  //       (error) => {
  //         console.log("Error buscando los productos");
  //         console.log(error);
  //       }
  //     );
  //   }
  // }

  // searchById( id: string )
  // {
  //   this.spiritService.getSpiritById( id, false ).subscribe(
  //     spirit => {
  //       this.verifyAddCartProduct( spirit );
  //       this.filteredProducts = [];
  //     },
  //     error => this.sweetAlert.presentError( 'Buscando Licor Por ID' )
  //   );
  // }

  // clearSearchData(): void
  // {
  //   this.search = '';
  //   this.filteredProducts = [];
  // }

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
    }

    if(indexSelected === (this.tabs.length + 1)) // Si se quieren borrar las ventas en paralelo.
    {
      this.deleteCartData(indexSelected);
    }
  }

  async deleteCartData(index: number)
  {
    // Eliminar el historial de ventas (Eliminar todos los tabs, solo dejar uno).
    const { isConfirmed } = await this.sweetAlert.presentDelete('Las pestañas de ventas creadas!');
    if(isConfirmed)
    {
      this.tabs = ['Venta #1'];
      this.selected.setValue(0);
      this.countSales = 1;
      const [firstSale] = this.products;
      this.products = [firstSale];
      // Guardar la persistencia en el localStorage
      this.cartService.refreshCart(this.products);
    }
    else
    {
      this.selected.setValue(index - 2);
    }
  }

  addTab() {
    this.countSales ++;
    this.tabs.push('Venta #' + this.countSales);
    this.products.push([]);
    this.selected.setValue(this.tabs.length - 1);
  }

  private addProductToCart(product: Product): CartItem
  {
    const { id = '' } = product;
    return {
              id, 
              product, 
              product_name: this.getFullProductName( product ),
              count: 1, 
              sale_price: product.sale_price,
              is_second_price: false,
              purchase_price: product.purchase_price
            };
  }

  finishSale(index: number)
  {
    const sale: CartItem[] = this.products[index];
    this.saleService.createSale(sale).subscribe(
      res => {
        this.products[index] = [];
        this.saleResumeTable.get(index)?.refreshData( this.products[index] );
        this.cartService.refreshCart(this.products);
        this.sweetAlert.presentSuccess('Venta Creada Correctamente!');
        console.log("venta creadaaa: ", res);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError('Creando Venta!');
      }
    );
    console.log("Venta: ", sale);
  }
}
