import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProviderPurchaseComponent } from './get-provider-purchase.component';

describe('GetProviderPurchaseComponent', () => {
  let component: GetProviderPurchaseComponent;
  let fixture: ComponentFixture<GetProviderPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProviderPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProviderPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
