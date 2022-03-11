import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from '../../interfaces/CartItem';
import { ChangePrice } from '../../interfaces/ChangePrice';
import { SaleItemDetail } from '../../interfaces/SaleItemDetail';
import { ChangePriceDialogComponent } from './change-price-dialog/change-price-dialog.component';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss']
})
export class SaleTableComponent implements OnInit, AfterViewInit
{
  @Input() saleId: number = -1;
  @Input() products: CartItem[] = [];
  @Input() index: number = -1;

  @Output() onDeleteItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onPlusItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onMinusItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onChangePriceItem: EventEmitter<SaleItemDetail> = new EventEmitter();
  @Output() onMarkSecondPrice: EventEmitter<SaleItemDetail> = new EventEmitter();
  
  public dataSource: MatTableDataSource<CartItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'second_price', 'total', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog
  ) 
  { 
    this.dataSource = new MatTableDataSource<CartItem>();
    this.dataSource.data = this.products;    
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void 
  {
  }

  refreshData(products: CartItem[])
  {
    this.products = products;
    this.dataSource.data = this.products;
  }

  getfullProductName(spirit: CartItem): string
  {
    return `${spirit.product.category.name} ${spirit.product.name}`;
  }

  getCartTotal(): string
  {
    let total = 0;

    for (const product of this.products) 
    {
      // if(product.is_second_price)
      // {
      //   total += (product.count * product.product.second_sale_price);    
      // }
      // else
      // {
      //   total += (product.count * product.sale_price);    
      // }

      total += (product.count * product.sale_price);      
    }

    return `${total}`;
  }

  getUnitPrice(product: CartItem): number
  {
    // if(product.is_second_price)
    // {
    //   return product.product.second_sale_price;
    // }

    return product.sale_price;
  }

  getProductTotal(product: CartItem)
  {
    // if(product.is_second_price)
    // {
    //   return `${(product.count * product.product.second_sale_price)}`;
    // }

    return `${(product.count * product.sale_price)}`;
  }

  removeItem( item: CartItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    this.onDeleteItem.emit( saleItemDetail );
  }

  plusItem( item: CartItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    this.onPlusItem.emit( saleItemDetail );
  }

  disminItem( item: CartItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    this.onMinusItem.emit( saleItemDetail );
  }

  markSecondPrice( item: CartItem )
  {
    const { id } = item;
    const saleItemDetail: SaleItemDetail = {
      index: this.index,
      id
    };

    const indexProduct = this.products.findIndex( p => p.id === item.id );
    console.log("Second price: ", this.products[indexProduct].is_second_price);
    if(indexProduct !== -1)
    {
      if(this.products[indexProduct].is_second_price)
      {
        this.products[indexProduct].is_second_price = false;
      }
      else
      {
        this.products[indexProduct].is_second_price = true;
      }
      this.dataSource.data = this.products;
      // this.products[indexProduct].is_second_price = !this.products[indexProduct].is_second_price;
    }
    console.log("Second price2222: ", this.products[indexProduct].is_second_price);

    this.onMarkSecondPrice.emit( saleItemDetail );
  }

  getCheck( item: CartItem )
  {
    const indexProduct = this.products.findIndex( p => p.id === item.id );
    if(indexProduct !== -1)
    {
      return this.products[indexProduct].is_second_price || false;
    }

    return false;
  }

  openChangePriceDialog( item: CartItem )
  {
    const { sale_price } = item;
    const data: ChangePrice = {price: sale_price, otherPrice: 0};

    const dialogRef = this.dialog.open(ChangePriceDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      console.log('The dialog was closed');     

      if( result === 0)
      {
        const saleItemDetail: SaleItemDetail = {
          index: this.index,
          id: item.id,
          otherPrice: result
        };
        this.onChangePriceItem.emit( saleItemDetail );
        return;
      }
      
      if(result )
      {
        const saleItemDetail: SaleItemDetail = {
          index: this.index,
          id: item.id,
          otherPrice: result
        };
        this.onChangePriceItem.emit( saleItemDetail );
        return;
      }

    });
  }

}
