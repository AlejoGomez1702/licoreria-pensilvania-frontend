import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartHeaderComponent } from './shopping-cart-header.component';

describe('ShoppingCartHeaderComponent', () => {
  let component: ShoppingCartHeaderComponent;
  let fixture: ComponentFixture<ShoppingCartHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
