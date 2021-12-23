import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllPurchasesComponent } from './list-all-purchases.component';

describe('ListAllPurchasesComponent', () => {
  let component: ListAllPurchasesComponent;
  let fixture: ComponentFixture<ListAllPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
