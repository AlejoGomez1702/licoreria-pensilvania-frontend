import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchasesComponent } from './create-purchases.component';

describe('CreatePurchasesComponent', () => {
  let component: CreatePurchasesComponent;
  let fixture: ComponentFixture<CreatePurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
