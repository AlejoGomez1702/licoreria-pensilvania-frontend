import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlcoholComponent } from './form-alcohol.component';

describe('FormAlcoholComponent', () => {
  let component: FormAlcoholComponent;
  let fixture: ComponentFixture<FormAlcoholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAlcoholComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
