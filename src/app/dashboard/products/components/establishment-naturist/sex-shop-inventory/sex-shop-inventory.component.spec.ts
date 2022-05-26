import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexShopInventoryComponent } from './sex-shop-inventory.component';

describe('SexShopInventoryComponent', () => {
  let component: SexShopInventoryComponent;
  let fixture: ComponentFixture<SexShopInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexShopInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexShopInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
