import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCigaretteComponent } from './new-cigarette.component';

describe('NewCigaretteComponent', () => {
  let component: NewCigaretteComponent;
  let fixture: ComponentFixture<NewCigaretteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCigaretteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCigaretteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
