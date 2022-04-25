import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SearchService } from 'src/app/dashboard/products/services/search.service';
import { Provider } from 'src/app/dashboard/providers/interfaces/Provider';
import { CartItem } from 'src/app/dashboard/sales/interfaces/CartItem';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { GetProviderPurchaseComponent } from '../../components/get-provider-purchase/get-provider-purchase.component';
import { PurchaseTableComponent } from '../../components/purchase-table/purchase-table.component';
import { Purchase } from '../../interfaces/Purchase';
import { PurchaseItemDetail } from '../../interfaces/PurchaseItemDetail';
import { PurchaseSaleData } from '../../interfaces/PurchaseSaleData';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-create-purchases',
  templateUrl: './create-purchases.component.html',
  styleUrls: ['./create-purchases.component.scss']
})
export class CreatePurchasesComponent implements OnInit 
{
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: string = '';

  // Productos agregados a la compra.
  public products: CartItem[] = [];
  // Poductos resultados de una busqueda.
  public filteredProducts!: Observable<Product[]>;

  // *********** Permite actualizar la tabla de resumen de compra******************** ///
  @ViewChild(PurchaseTableComponent) purchaseResumeTable!: PurchaseTableComponent;

  constructor(
    private purchaseService: PurchaseService,
    private searchService: SearchService,
    // private cartService: CartService,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,    
    private sweetAlert: SweetAlertService,
    public dialog: MatDialog
  ) 
  { }

  ngOnInit(): void {
  }

  getFullProductName( product: Product )
  {
    return `${product.category.name} ${product.name} X ${product.unit.unit}`;
  }

  get isEmpty(): boolean
  {
    if(this.products && this.products[0] )
    {
      return false; // No está vacio
    }

    return true; // Está vacio
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

  /**
   * Añade un producto buscado por nombre o código de barras.
   * @param product 
   */
   verifyAddCartProduct( product: Product )
   { 
     const cartItem = this.addProductToCart( product );
     const indexProduct = this.products.findIndex( p => p.id === cartItem.id );
     // console.log('index product: ', indexProduct);
     if(indexProduct !== -1)
     {
       this.products[indexProduct].count ++;
     }
     else // findIndex retorno -1, quiere decir que no lo encontró.
     {
       this.products.push( cartItem );
     }  
     
     this.refreshPurchaseResume();
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

   refreshPurchaseResume()
  {
    // Guardar la persistencia en el localStorage
    // this.cartService.refreshCart(this.products);
    console.log("asi va el carrito de compras:");
    console.log(this.products);

    this.purchaseResumeTable.refreshData( this.products );
    // this.verifySnack();
  }

  removeCartItem(id: string)
  {
    console.log("El id que llega es:");
    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products.splice(indexProduct);
    }

    this.refreshPurchaseResume();
  }

  plusCartItem(id: string)
  {
    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[indexProduct].count ++;
    }

    this.refreshPurchaseResume();
  }

  minusCartItem(id: string)
  {
    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      const count = this.products[indexProduct].count;
      if(!(count < 2)) //Solo hay un item agregado
      {
        this.products[indexProduct].count --;
      }
    }

    this.refreshPurchaseResume();
  }

  changePriceCartItem(purchaseItemDetail: PurchaseItemDetail)
  {
    const { id, otherPrice = 0 } = purchaseItemDetail;

    console.log(purchaseItemDetail);

    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[indexProduct].purchase_price = otherPrice;
    }

    this.refreshPurchaseResume();
  }

  getCartTotal(): number
  {
    let total = 0;

    for (const product of this.products) 
    {
      const { count, purchase_price = 0 } = product;
      total += (count * purchase_price);      
    }

    return total;
  }

  sendPurchase( providerId: string )
  {
    this.purchaseService.createPurchase( this.products, providerId ).subscribe(
      res => {
        this.products = [];
        this.purchaseResumeTable.refreshData( this.products );
        // this.cartService.refreshCart(this.products);
        this.sweetAlert.presentSuccess('Compra Creada Correctamente!');
        console.log("compra creadaaa: ", res);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError('Creando Compra!');
      }
    );
    console.log("Compra: ", this.products);
  }

  finishPurchase()
  {
    const dialogRef = this.dialog.open(GetProviderPurchaseComponent, {
      minWidth: '300px',
      maxWidth: '500px',
      data: this.getCartTotal(),
    });

    dialogRef.afterClosed().subscribe((result: Provider) => {
      if(result)
      {
        console.log("Resultado: " ,result);
        const { id = '' } = result; 
        // Finalizar la compra.
        this.sendPurchase( id );
      }
    });
  }

  clearSearchData()
  {

  }

  searchById( id: string )
  {
    
  }

}
