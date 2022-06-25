import { TestBed } from '@angular/core/testing';

import { ProductUnitsService } from './product-units.service';

describe('ProductUnitsService', () => {
  let service: ProductUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
