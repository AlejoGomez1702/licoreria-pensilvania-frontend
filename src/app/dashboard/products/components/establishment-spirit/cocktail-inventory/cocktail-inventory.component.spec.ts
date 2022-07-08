import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailInventoryComponent } from './cocktail-inventory.component';

describe('CocktailInventoryComponent', () => {
  let component: CocktailInventoryComponent;
  let fixture: ComponentFixture<CocktailInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocktailInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
