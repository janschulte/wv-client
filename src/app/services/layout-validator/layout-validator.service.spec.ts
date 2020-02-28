import { TestBed } from '@angular/core/testing';

import { LayoutValidatorService } from './layout-validator.service';

describe('LayoutValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutValidatorService = TestBed.get(LayoutValidatorService);
    expect(service).toBeTruthy();
  });
});
