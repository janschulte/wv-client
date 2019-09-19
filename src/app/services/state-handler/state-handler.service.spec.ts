import { TestBed } from '@angular/core/testing';

import { StateHandlerService } from './state-handler.service';

describe('StateHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateHandlerService = TestBed.get(StateHandlerService);
    expect(service).toBeTruthy();
  });
});
