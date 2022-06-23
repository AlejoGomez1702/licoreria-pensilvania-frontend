import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondPriceDialogComponent } from './second-price-dialog.component';

describe('SecondPriceDialogComponent', () => {
  let component: SecondPriceDialogComponent;
  let fixture: ComponentFixture<SecondPriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondPriceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
