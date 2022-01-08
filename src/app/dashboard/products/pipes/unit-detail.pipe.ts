import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/Product';

@Pipe({
  name: 'unitDetail'
})
export class UnitDetailPipe implements PipeTransform {

  transform(product: Product, ...args: string[]): string 
  {
    const [ productType = '' ] = args;
    switch ( productType ) 
    {
      case 'cigarettes':
        return `${product.unit.unit} X ${product.unit.units}`;

      case 'spirits':
        return product.unit.unit;
    
      default:
        return 'Verificar Pipe UnitDetail';
    }
  }

}
