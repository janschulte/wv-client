import { TestBed } from '@angular/core/testing';

import { ServiceSelectorService } from './service-selector.service';

describe('InitializeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceSelectorService = TestBed.get(ServiceSelectorService);
    expect(service).toBeTruthy();
  });
});
