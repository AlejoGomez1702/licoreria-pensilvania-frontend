import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blankSpace'
})
export class BlankSpacePipe implements PipeTransform 
{

  transform(value: string, ...args: unknown[]): string 
  {
    if(!value)
    {
      return '-----';
    }

    return value;
  }

}
