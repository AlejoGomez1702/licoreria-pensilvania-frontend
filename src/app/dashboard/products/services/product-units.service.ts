import { Injectable } from '@angular/core';
import { SaleItem } from '../../sales/interfaces/SaleItem';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitsService 
{

  constructor() { }

  getfullProductName(product: Product ): string
  {
    const {
      unit: name,
      grams = '',
      ml = '',
      units = ''
    } = product.unit;

    const unit = `${name} X ${grams ? (grams + 'g') : ml ? (ml + 'ml') : units}`;

    return `${product.category.name} ${product.name} ${unit}`;
  }
}
