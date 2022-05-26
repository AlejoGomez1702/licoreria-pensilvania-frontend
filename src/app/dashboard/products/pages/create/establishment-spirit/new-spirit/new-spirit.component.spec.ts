import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpiritComponent } from './new-spirit.component';

describe('NewSpiritComponent', () => {
  let component: NewSpiritComponent;
  let fixture: ComponentFixture<NewSpiritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
