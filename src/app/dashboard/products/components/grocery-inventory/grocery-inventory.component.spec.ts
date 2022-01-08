import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryInventoryComponent } from './grocery-inventory.component';

describe('GroceryInventoryComponent', () => {
  let component: GroceryInventoryComponent;
  let fixture: ComponentFixture<GroceryInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
