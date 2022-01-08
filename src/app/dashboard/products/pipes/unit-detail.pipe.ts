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
        const unitsCount = product.unit.units || 0;
        if(unitsCount > 1)
        {
          return `${product.unit.unit} X ${product.unit.units}`;
        }
        return `${product.unit.unit}`;

      case 'spirits':
        return product.unit.unit;

      case 'drinks':
        // console.log(product);
        return `${product.unit.unit} ${product.unit.ml} ml`;
    
      default:
        return 'Verificar Pipe UnitDetail';
    }
  }

}
