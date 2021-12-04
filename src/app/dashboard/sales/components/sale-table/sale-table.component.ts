import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from '../../interfaces/CartItem';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss']
})
export class SaleTableComponent implements OnInit 
{
  public products: CartItem[] = [];

  public dataSource: MatTableDataSource<CartItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'total', 'actions'];

  constructor() 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  getfullProductName(spirit: CartItem): string
  {
    return  `${spirit.product.category.name} ${spirit.product.name}`;
  }

}
