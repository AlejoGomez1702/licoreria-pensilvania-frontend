import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNaturistComponent } from './new-naturist.component';

describe('NewNaturistComponent', () => {
  let component: NewNaturistComponent;
  let fixture: ComponentFixture<NewNaturistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNaturistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNaturistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
