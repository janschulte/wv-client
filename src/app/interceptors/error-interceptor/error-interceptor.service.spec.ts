import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error-interceptor.service';

describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorInterceptor = TestBed.get(ErrorInterceptor);
    expect(service).toBeTruthy();
  });
});
