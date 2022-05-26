import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkInventoryComponent } from './drink-inventory.component';

describe('DrinkInventoryComponent', () => {
  let component: DrinkInventoryComponent;
  let fixture: ComponentFixture<DrinkInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
