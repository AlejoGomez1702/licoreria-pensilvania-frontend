import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/Product';

@Pipe({
  name: 'productName'
})
export class ProductNamePipe implements PipeTransform 
{

  transform(product: Product, ...args: unknown[]): string 
  {
    return `${product.category.name} ${product.name}`;
  }

}
