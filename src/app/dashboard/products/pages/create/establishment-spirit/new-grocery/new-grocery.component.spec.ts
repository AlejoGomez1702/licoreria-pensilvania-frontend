import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroceryComponent } from './new-grocery.component';

describe('NewGroceryComponent', () => {
  let component: NewGroceryComponent;
  let fixture: ComponentFixture<NewGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroceryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
