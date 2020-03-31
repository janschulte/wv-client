import { Pipe, PipeTransform } from '@angular/core';
import { HelgolandService } from '@helgoland/core';

@Pipe({
  name: 'sortServices',
  pure: false
})
export class SortServicesPipe implements PipeTransform {

  transform(services: HelgolandService[], ...args: any[]): any {
    services.sort((prev: HelgolandService, next: HelgolandService) => {
      if (prev.label < next.label) {
        return -1;
      } else {
        return 1;
      }
    });
    return services;
  }

}
