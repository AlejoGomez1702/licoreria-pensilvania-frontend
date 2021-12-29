import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/dashboard/sales/interfaces/CartItem';
import { CartLicoreriaService } from '../../services/cart-licoreria.service';

@Component({
  selector: 'app-fab-cart',
  templateUrl: './fab-cart.component.html',
  styleUrls: ['./fab-cart.component.scss']
})
export class FabCartComponent implements OnInit 
{
  @Input() totalItems = 0;
  public products: CartItem[] = [];

  constructor(
    private cartLicoreriaService: CartLicoreriaService
  ) { }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.products = this.cartLicoreriaService.getCart();
  }

  getfullProductName(product: CartItem): string
  {
    return `${product.product.category.name} ${product.product.name}`;
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

}
