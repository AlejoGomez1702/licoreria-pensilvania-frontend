import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSaleDialogComponent } from './cash-sale-dialog.component';

describe('CashSaleDialogComponent', () => {
  let component: CashSaleDialogComponent;
  let fixture: ComponentFixture<CashSaleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashSaleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSaleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
