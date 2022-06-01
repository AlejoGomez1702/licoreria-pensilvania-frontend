import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturistComponent } from './naturist.component';

describe('NaturistComponent', () => {
  let component: NaturistComponent;
  let fixture: ComponentFixture<NaturistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
