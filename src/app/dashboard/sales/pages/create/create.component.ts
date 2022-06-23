import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Observable } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SearchService } from 'src/app/dashboard/products/services/search.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CashSaleDialogComponent } from '../../components/cash-sale-dialog/cash-sale-dialog.component';
import { SaleTableComponent } from '../../components/sale-table/sale-table.component';
import { SaleItem } from '../../interfaces/SaleItem';
import { ClientSaleData } from '../../interfaces/ClientSaleData';
import { DialogCreateBack } from '../../interfaces/DialogCreateBack';
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
  public products: SaleItem[][] = [[]];
  // Poductos resultados de una busqueda.
  // public filteredProducts: Product[] = [];
  public filteredProducts!: Observable<Product[]>;
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: FormControl = new FormControl('');
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
    private sweetAlert: SweetAlertService,
    public dialog: MatDialog
  ) 
  {}

  ngOnInit(): void 
  {    
    this.search.valueChanges.pipe(
      debounce( () => interval(600) )
    ).subscribe(
      () => this.searchProduct()
    );

    this.verifySnack();
    // setTimeout(() => {
    //   this.loadPersistence();
    // }, 400);
  }

  getFullProductName( product: Product )
  {
    const {
      unit: name,
      grams = '',
      ml = '',
      units = ''
    } = product.unit;

    const unit = `${name} X ${grams ? (grams + 'g') : ml ? (ml + 'ml') : units}`;

    return `${product.category.name} ${product.name} ${unit}`;
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

    const SaleItem = this.addProductToCart( product );
    const indexProduct = this.products[tabIndex].findIndex( p => p.id === SaleItem.id );
    // console.log('index product: ', indexProduct);
    if(indexProduct !== -1)
    {
      this.products[tabIndex][indexProduct].count ++;
    }
    else // findIndex retorno -1, quiere decir que no lo encontró.
    {
      this.products[tabIndex].push( SaleItem );
    }
    
    this.refreshSaleResume(tabIndex);
    this.search.setValue('');
  }

  plusSaleItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id } = saleItemDetail;

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[index][indexProduct].count ++;
    }

    this.refreshSaleResume(index);
  }

  minusSaleItem(saleItemDetail: SaleItemDetail)
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
    if( !this.search.value ) return;      
    // Si se esta buscando por código de barras.
    const isBarCode = Number( this.search.value );
    if(isBarCode)
    {
      this.searchByBarcode();
    } 
    else
    {
      this.filteredProducts = this.searchService.searchProduct( this.search.value ).pipe(
        map(products => (products ? products.results : [])),
      );
    }
  }

  searchByBarcode()
  {
    this.filterService.searchProductByBarcode( this.search.value ).subscribe(
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

  private addProductToCart(product: Product): SaleItem
  {
    const { id = '' } = product;
    return {
              id, 
              product, 
              product_name: this.getFullProductName( product ),
              count: 1, 
              sale_price: product.sale_price,
              second_sale_price: product.second_sale_price,
              is_second_price: false,
              count_second_price: 0,
              purchase_price: product.purchase_price
            };
  }

  getCartTotal( index:number ): number
  {
    this.saleResumeTable.get(index)
    let total = 0;

    for (const product of this.products[index]) 
    {
      total += (product.count * product.sale_price);      
    }

    return total;
  }

  /**
   * Finalizar una venta del listado de ventas.
   * @param index Posición en el listado de ventas(array).
   */
  finishSale(index: number, clientId?: string, deposit?: number): void
  {
    const sale: SaleItem[] = this.products[index];
    console.log("La venta es: ", sale);
    this.saleService.createSale( sale, clientId, deposit ).subscribe(
      res => {
        this.products[index] = [];
        this.saleResumeTable.get(index)?.refreshData( this.products[index] );
        this.cartService.refreshCart(this.products);
        this.sweetAlert.presentSuccess('Venta Creada Correctamente!');
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError('Creando Venta!');
      }
    );
  }

  /**
   * Finalizar una venta al contado
   * @param index Posición en el listado de ventas(arreglo).
   */
  finishCashSale( index: number, typeSale: string )
  {
    const clientSaleData: ClientSaleData = {
      totalSale: this.getCartTotal( index ),
      typeSale //Venta de contado o fiado
    };

    const dialogRef = this.dialog.open(CashSaleDialogComponent, {
      minWidth: '300px',
      maxWidth: '500px',
      data: clientSaleData,
    });

    dialogRef.afterClosed().subscribe((result: DialogCreateBack) => {
      
      console.log("Siii close", result);
      // Si seleccioné un cliente, crear la venta con este registro
      if(result)
      {
        const id = result.client?.id || undefined;
        const deposit = result.deposit || undefined;
        // Finalizar la venta.
        this.finishSale( index, id, deposit );        
      }
    });
  }

  /**
   * Remover un Item de la lista de venta.
   * @param saleItemDetail 
   * @returns 
   */
  removeSaleItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id } = saleItemDetail;

    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct === -1) return;

    this.products[index].splice(indexProduct, 1);

    this.refreshSaleResume(index);
  }

  /**
   * Cambiar el precio unitario con el que se venden los productos para llevar
   * @param saleItemDetail 
   * @returns 
   */
  changePriceSaleItem(saleItemDetail: SaleItemDetail)
  {
    const { index, id, product } = saleItemDetail;
    const indexProduct = this.products[index].findIndex( p => p.id === id );
    if(indexProduct === -1) return;
    if( !product || !product.other_price ) return;
    
    this.products[index][indexProduct].other_price = product.other_price;
    
    this.refreshSaleResume(index);
  }

  /**
   * Marcar el precio secundario de un producto
   * precio por fuera? cuantos por fuera?
   * @param saleItemDetail 
   * @returns 
   */
  markSecondPriceProduct( saleItemDetail: SaleItemDetail )
  {
    // index = Número de venta, 
    // id = Identificador del producto que se le marco el precio secundario.
    const { index, id } = saleItemDetail;

    const indexSelectedProduct = this.products[index].findIndex( p => p.id === id );
    if(indexSelectedProduct === -1) return;

    this.products[index][indexSelectedProduct] = saleItemDetail.product!;

    // Guardar la persistencia en el localStorage
    this.refreshSaleResume(this.selected.value);
  }
}
