import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Observable } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SearchService } from 'src/app/dashboard/products/services/search.service';
import { Provider } from 'src/app/dashboard/providers/interfaces/Provider';
import { SaleItem } from 'src/app/dashboard/sales/interfaces/SaleItem';
import { SaleItemDetail } from 'src/app/dashboard/sales/interfaces/SaleItemDetail';
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
  public search: FormControl = new FormControl('');

  // Productos agregados a la compra.
  public products: SaleItem[] = [];
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

  ngOnInit(): void 
  {
    this.search.valueChanges.pipe(
      debounce( () => interval(600) )
    ).subscribe(
      () => this.searchProduct()
    );
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

  /**
   * Añade un producto buscado por nombre o código de barras.
   * @param product 
   */
   verifyAddCartProduct( product: Product )
   { 
     const SaleItem = this.addProductToCart( product );
     const indexProduct = this.products.findIndex( p => p.id === SaleItem.id );
     // console.log('index product: ', indexProduct);
     if(indexProduct !== -1)
     {
       this.products[indexProduct].count ++;
     }
     else // findIndex retorno -1, quiere decir que no lo encontró.
     {
       this.products.push( SaleItem );
     }  
     
     this.refreshPurchaseResume();
     this.search.setValue('');
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

  removeSaleItem(id: string)
  {
    console.log("El id que llega es:");
    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products.splice(indexProduct, 1);
    }

    this.refreshPurchaseResume();
  }

  plusSaleItem(id: string)
  {
    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[indexProduct].count ++;
    }

    this.refreshPurchaseResume();
  }

  minusSaleItem(id: string)
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

  changeCountItem( itemDetail: SaleItemDetail )
  {
    const { id, product } = itemDetail;
    const indexProduct = this.products.findIndex( p => p.id === id );
    if(indexProduct !== -1)
    {
      this.products[indexProduct].count = product?.count || 1;
    }

    this.refreshPurchaseResume();
  }

  changePriceSaleItem(purchaseItemDetail: PurchaseItemDetail)
  {
    const { id, otherPrice = 0 } = purchaseItemDetail;
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
      minWidth: '350px',
      maxWidth: '650px',
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
