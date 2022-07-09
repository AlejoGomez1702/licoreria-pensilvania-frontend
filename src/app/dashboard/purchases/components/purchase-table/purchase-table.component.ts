import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangePriceDialogComponent } from 'src/app/dashboard/sales/components/sale-table/change-price-dialog/change-price-dialog.component';
import { SaleItem } from 'src/app/dashboard/sales/interfaces/SaleItem';
import { ChangePrice } from 'src/app/dashboard/sales/interfaces/ChangePrice';
import { PurchaseItemDetail } from '../../interfaces/PurchaseItemDetail';
import { SaleTableService } from 'src/app/dashboard/sales/services/sale-table.service';
import { SaleItemDetail } from 'src/app/dashboard/sales/interfaces/SaleItemDetail';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit, AfterViewInit
{
  @Input() products: SaleItem[] = [];

  public dataSource: MatTableDataSource<SaleItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'total', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;

  @Output() onDeleteItem: EventEmitter<string> = new EventEmitter();
  @Output() onPlusItem: EventEmitter<string> = new EventEmitter();
  @Output() onMinusItem: EventEmitter<string> = new EventEmitter();
  @Output() onChangePriceItem: EventEmitter<PurchaseItemDetail> = new EventEmitter();
  @Output() onChangeCountItem: EventEmitter<SaleItemDetail> = new EventEmitter();


  constructor(
    private saleTableService: SaleTableService,
    public dialog: MatDialog
  )
  { 
    this.dataSource = new MatTableDataSource<SaleItem>();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  refreshData(products: SaleItem[])
  {
    this.products = products;
    this.dataSource.data = this.products;
  }
  
  getfullProductName(spirit: SaleItem): string
  {
    return  `${spirit.product.category.name} ${spirit.product.name}`;
  }

  getCartTotal(): string
  {
    let total = 0;

    for (const product of this.products) 
    {
      total += (product.count * (product.purchase_price || 0));      
    }

    return `${total}`;
  }

  getProductTotal(product: SaleItem)
  {
    return `${(product.count * (product.purchase_price || 0))}`;
  }

  plusItem( id: string )
  {
    this.onPlusItem.emit( id );
  }

  disminItem( id: string )
  {
    this.onMinusItem.emit( id );
  }

  removeItem( id: string )
  {
    this.onDeleteItem.emit( id );
  }

  openChangePriceDialog( item: SaleItem )
  {
    const { purchase_price = 0 } = item;
    const data: ChangePrice = {price: purchase_price, otherPrice: 0};

    const dialogRef = this.dialog.open(ChangePriceDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      console.log('The dialog was closed');     

      if( result === 0)
      {
        const saleItemDetail: PurchaseItemDetail = {
          id: item.id,
          otherPrice: result
        };
        this.onChangePriceItem.emit( saleItemDetail );
        return;
      }
      
      if(result)
      {
        const saleItemDetail: PurchaseItemDetail = {
          id: item.id,
          otherPrice: result
        };
        this.onChangePriceItem.emit( saleItemDetail );
        return;
      }

    });
  }

  /**
   * Cambiar la cantidad de un item enlistado
   * @param item Producto a cambiar la cantidad 
   */
   openChangeCountDialog( item: SaleItem )
   {
     const dialog = this.saleTableService.verifyChangeCountData( item );
     dialog.afterClosed().subscribe((result: number) => {    
       if( result )
       {
         item.count = result;
 
         const saleItemDetail: SaleItemDetail = {
           index: -1,
           id: item.id,
           product: item
         };
 
         this.onChangeCountItem.emit( saleItemDetail );
       }
     });
   }

}
