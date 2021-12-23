import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from '../../interfaces/CartItem';

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

  public dataSource: MatTableDataSource<CartItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'total', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor() 
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
    // console.log(this.saleId);
    // this.dataSource.data = this.products;
  }

  refreshData(products: CartItem[])
  {
    this.products = products;
    this.dataSource.data = this.products;

    console.log("Asi va el carrito de compras: ");
    console.log(this.products);
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
