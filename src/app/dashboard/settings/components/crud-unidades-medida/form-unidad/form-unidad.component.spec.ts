import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnidadComponent } from './form-unidad.component';

describe('FormUnidadComponent', () => {
  let component: FormUnidadComponent;
  let fixture: ComponentFixture<FormUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
