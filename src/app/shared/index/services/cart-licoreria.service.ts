import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/dashboard/sales/interfaces/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartLicoreriaService 
{

  constructor() { }

  refreshCart( cart: CartItem[] ) 
  {
    localStorage.setItem('licoreria-cart', JSON.stringify(cart));
  }

  getCart(): CartItem[]
  {
    const cart = localStorage.getItem('licoreria-cart') || '';
    if(cart)
    {
      return JSON.parse( cart );
    }

    return [];
  }

  addItem( product: CartItem ): CartItem[]
  {
    let cartList: CartItem[] = [];
    const cartString = localStorage.getItem('licoreria-cart') || '';
    if(cartString)
    {
      cartList = JSON.parse( cartString );
    }

    cartList.push( product );
    localStorage.setItem('licoreria-cart', JSON.stringify(cartList));

    return cartList;
  }

  clearCart() 
  {
    localStorage.removeItem('licoreria-cart');
  }

}
