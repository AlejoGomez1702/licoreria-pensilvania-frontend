import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from 'src/app/dashboard/sales/interfaces/CartItem';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit, AfterViewInit
{
  @Input() products: CartItem[] = [];

  public dataSource: MatTableDataSource<CartItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'total', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor()
  { 
    this.dataSource = new MatTableDataSource<CartItem>();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  getfullProductName(spirit: CartItem): string
  {
    return  `${spirit.product.category.name} ${spirit.product.name}`;
  }

  getCartTotal(): string
  {
    let total = 0;

    for (const product of this.products) 
    {
      total += (product.count * product.sale_price);      
    }

    return `${total}`;
  }

  getProductTotal(product: CartItem)
  {
    return `${(product.count * product.sale_price)}`;
  }

}
