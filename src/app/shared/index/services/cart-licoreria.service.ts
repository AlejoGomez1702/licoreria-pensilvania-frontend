import { Injectable } from '@angular/core';
import { SaleItem } from 'src/app/dashboard/sales/interfaces/SaleItem';

@Injectable({
  providedIn: 'root'
})
export class CartLicoreriaService 
{

  constructor() { }

  refreshCart( cart: SaleItem[] ) 
  {
    localStorage.setItem('licoreria-cart', JSON.stringify(cart));
  }

  getCart(): SaleItem[]
  {
    const cart = localStorage.getItem('licoreria-cart') || '';
    if(cart)
    {
      return JSON.parse( cart );
    }

    return [];
  }

  addItem( product: SaleItem ): SaleItem[]
  {
    let cartList: SaleItem[] = [];
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
