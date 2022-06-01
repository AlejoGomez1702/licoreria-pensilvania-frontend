import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigaretteComponent } from './cigarette.component';

describe('CigaretteComponent', () => {
  let component: CigaretteComponent;
  let fixture: ComponentFixture<CigaretteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CigaretteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CigaretteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
