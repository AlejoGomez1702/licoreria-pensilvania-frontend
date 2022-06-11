import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../../settings/interfaces/unidad-medida.interface';
import { Product } from '../interfaces/Product';

@Pipe({
  name: 'unitDetail'
})
export class UnitDetailPipe implements PipeTransform {

  transform(unit: Unit, ...args: string[]): string 
  {
    const {
      unit: name,
      grams = '',
      ml = '',
      units = ''
    } = unit;

    return `${name} X ${grams ? (grams + 'g') : ml ? (ml + 'ml') : units}`;
  }

}
