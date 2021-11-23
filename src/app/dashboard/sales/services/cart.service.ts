import { Injectable } from '@angular/core';
import { Spirit } from '../../products/interfaces/Spirit';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{
  private items: Spirit[] = [];

  constructor() { }

  addToCart(product: Spirit) 
  {
    this.items.push(product);
  }

  getItems() 
  {
    return this.items;
  }

  clearCart() 
  {
    this.items = [];
    return this.items;
  }

}
