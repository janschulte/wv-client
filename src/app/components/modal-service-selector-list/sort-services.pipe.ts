import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '@helgoland/core';

@Pipe({
  name: 'sortServices',
  pure: false
})
export class SortServicesPipe implements PipeTransform {

  transform(services: Service[], ...args: any[]): any {
    services.sort((prev: Service, next: Service) => {
      if (prev.label < next.label) {
        return -1;
      } else {
        return 1;
      }
    });
    return services;
  }

}
