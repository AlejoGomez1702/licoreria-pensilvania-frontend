import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDrinkComponent } from './new-drink.component';

describe('NewDrinkComponent', () => {
  let component: NewDrinkComponent;
  let fixture: ComponentFixture<NewDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDrinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
