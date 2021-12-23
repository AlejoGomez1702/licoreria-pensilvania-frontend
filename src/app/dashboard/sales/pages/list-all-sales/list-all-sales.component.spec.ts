import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllSalesComponent } from './list-all-sales.component';

describe('ListAllSalesComponent', () => {
  let component: ListAllSalesComponent;
  let fixture: ComponentFixture<ListAllSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
