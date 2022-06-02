import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {

  transform(type: string, ...args: unknown[]): string 
  {
    let title = 'INVENTARIO DE PRODUCTOS ';

    switch (type) 
    {
      case 'spirit':
      break;

      case 'cigarette':
      break;

      case 'drink':
      break;

      case 'grocery':
      break;
  
      case 'naturist':
        title += '(NATURISTAS)'
      break;

      case 'sexshop':
      break;
  
      default: break;  
    }

    return title;
  }

}
