import { Injectable } from '@angular/core';
import { Spirit } from '../../products/interfaces/Spirit';
import { CartItem } from '../interfaces/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{

  constructor() { }

  refreshCart( cart: CartItem[][] ) 
  {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): CartItem[][]
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
