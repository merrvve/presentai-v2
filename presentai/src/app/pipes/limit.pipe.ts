import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: any[], limit: number): any[] {
    if (!Array.isArray(value) || limit <= 0) {
      return value;
    }
    return value.slice(0, limit);
  }

}
