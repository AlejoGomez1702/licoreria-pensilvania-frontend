import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllSalesPurchasesComponent } from './list-all-sales-purchases.component';

describe('ListAllSalesPurchasesComponent', () => {
  let component: ListAllSalesPurchasesComponent;
  let fixture: ComponentFixture<ListAllSalesPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllSalesPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllSalesPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
