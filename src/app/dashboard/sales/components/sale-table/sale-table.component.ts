import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SaleItem } from '../../interfaces/SaleItem';
import { ChangePrice } from '../../interfaces/ChangePrice';
import { SaleItemDetail } from '../../interfaces/SaleItemDetail';
import { SaleTableService } from '../../services/sale-table.service';
import { ChangePriceDialogComponent } from './change-price-dialog/change-price-dialog.component';
import { SecondPriceDialogComponent } from './second-price-dialog/second-price-dialog.component';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss']
})
export class SaleTableComponent implements OnInit, AfterViewInit
{
  @Input() saleId: number = -1;
  // Productos registrados en la venta.
  @Input() products: SaleItem[] = [];
  @Input() index: number = -1;

  @Output() onDeleteItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onPlusItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onMinusItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onChangePriceItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onMarkSecondPrice: EventEmitter<SaleItemDetail> = new EventEmitter();
  
  public dataSource: MatTableDataSource<SaleItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'second_price', 'total', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private saleTableService: SaleTableService,
    public dialog: MatDialog
  ) 
  { 
    this.dataSource = new MatTableDataSource<SaleItem>();
    this.dataSource.data = this.products;    
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void 
  {
  }

  refreshData(products: SaleItem[])
  {
    this.products = products;
    this.dataSource.data = this.products;
  }

  getfullProductName(SaleItem: SaleItem): string
  {
    const { product } = SaleItem; 
    const {
      unit: name,
      grams = '',
      ml = '',
      units = ''
    } = SaleItem.product.unit;

    const unit = `${name} X ${grams ? (grams + 'g') : ml ? (ml + 'ml') : units}`;

    return `${product.category.name} ${product.name} ${unit}`;
  }

  getCartTotal(): string
  {
    let total = 0;

    for (const product of this.products) 
    {
      total += this.getProductTotal(product);    
    }

    return `${total}`;
  }

  getUnitPrice(product: SaleItem): number
  {
    const total = this.getProductTotal( product );
    const unitPrice = total / product.count;
    
    return unitPrice;
  }

  getProductTotal(product: SaleItem)
  {
    let total = 0;
    
    if( product.is_second_price ) // Si vienen productos con precio secundario
    {
        // Cantidad de productos con precio secundario
        const countSecondPrice = product.count_second_price || 0;
        const secondPrices = countSecondPrice * product.second_sale_price;
        const otherPrice = (product.other_price) ? product.other_price : product.sale_price;
        const normalPrices = (product.count - countSecondPrice) * otherPrice;

        total += secondPrices + normalPrices;
    }
    else
    {
        if( product.other_price )
        {
            total += product.count * product.other_price;     
        }
        else
        {
            total += product.count * product.sale_price;     
        }                   
    }

    return total;
  }

  removeItem( item: SaleItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    this.onDeleteItem.emit( saleItemDetail );
  }

  plusItem( item: SaleItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    this.onPlusItem.emit( saleItemDetail );
  }

  disminItem( item: SaleItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    this.onMinusItem.emit( saleItemDetail );
  }

  getCheck( item: SaleItem )
  {
    const indexProduct = this.products.findIndex( p => p.id === item.id );
    if(indexProduct !== -1)
    {
      return this.products[indexProduct].is_second_price || false;
    }

    return false;
  }

  /**
   * Cambia el precio unitario de los productos (Precio principal)
   * @param item Producto seleccionado
   */
  openChangePriceDialog( item: SaleItem )
  {
    const { sale_price } = item;
    const data: ChangePrice = {price: sale_price, otherPrice: 0};

    const dialog = this.saleTableService.verifyChangePriceData( data );
    dialog.afterClosed().subscribe((result: number) => {    
      if( result )
      {
        item.other_price = result;

        const saleItemDetail: SaleItemDetail = {
          index: this.index,
          id: item.id,
          product: item
        };

        this.onChangePriceItem.emit( saleItemDetail );
      }
    });
  }

  /**
   * Cuando se quiere vender un producto en especifico a un precio secundario.
   * @param item Producto seleccionado
   */
  markSecondPrice( item: SaleItem )
  {
    // Del listado de productos de la venta, busqueme el indice del producto que se está seleccionando.
    const indexSelectedProduct = this.products.findIndex( p => p.id === item.id );
    let selectedProduct = this.products[indexSelectedProduct];
    const { is_second_price: isSecondPriceSelected = false } = selectedProduct;
    if(isSecondPriceSelected) // Estaba seleccionado y hay que deseleccionar
    {
      const { is_second_price, count_second_price, ...data } = selectedProduct;
      selectedProduct = data;
    }
    else // Se selecciona el valor secundario
    {
      const dialog = this.saleTableService.verifySecondPriceData( selectedProduct );  
      dialog.afterClosed().subscribe((result: number) => {
        if(result !== undefined  && result > 0)
        {
          // Si se selecciona alguna cantidad de productos agregarle la información de cuantos a la venta
          selectedProduct.is_second_price = true;
          selectedProduct.count_second_price = result;
        }   
        else
        {
          selectedProduct.is_second_price = false;
        }
      }); 
    }

    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id: item.id,
      product: selectedProduct
    };

    this.onMarkSecondPrice.emit( saleItemDetail );
  }
}
