import { Injectable } from '@angular/core';
import { SaleItem } from '../interfaces/SaleItem';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{

  constructor() { }

  refreshCart( cart: SaleItem[][] ) 
  {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): SaleItem[][]
  {
    const cart = localStorage.getItem('cart') || '';
    if(cart)
    {
      return JSON.parse( cart );
    }

    return [[]];
  }

  clearCart() 
  {
    localStorage.removeItem('cart');
  }

}
