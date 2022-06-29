import { TestBed } from '@angular/core/testing';

import { ProductFrontendService } from './product-frontend.service';

describe('ProductFrontendService', () => {
  let service: ProductFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
