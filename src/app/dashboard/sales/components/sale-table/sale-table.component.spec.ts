import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTableComponent } from './sale-table.component';

describe('SaleTableComponent', () => {
  let component: SaleTableComponent;
  let fixture: ComponentFixture<SaleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
