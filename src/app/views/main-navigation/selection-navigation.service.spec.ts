/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { SelectionNavigationService } from './selection-navigation.service';


describe('Service: SelectionNavigation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionNavigationService]
    });
  });

  it('should ...', inject([SelectionNavigationService], (service: SelectionNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
