import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTableComponent } from './purchase-table.component';

describe('PurchaseTableComponent', () => {
  let component: PurchaseTableComponent;
  let fixture: ComponentFixture<PurchaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
