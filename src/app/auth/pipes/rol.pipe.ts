import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(rol: string, ...args: unknown[]): string 
  {
    if(rol === 'ADMIN_ROLE')
    {
      return 'Administrador';
    }
    else if( rol === 'USER_ROLE' )
    {
      return 'Vendedor';
    }

    return '';
    // return `${product.category.name} ${product.name}`;
  }

}
