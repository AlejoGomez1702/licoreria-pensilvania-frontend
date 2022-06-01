import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexShopComponent } from './sex-shop.component';

describe('SexShopComponent', () => {
  let component: SexShopComponent;
  let fixture: ComponentFixture<SexShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
