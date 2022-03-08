import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePriceDialogComponent } from './change-price-dialog.component';

describe('ChangePriceDialogComponent', () => {
  let component: ChangePriceDialogComponent;
  let fixture: ComponentFixture<ChangePriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePriceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
