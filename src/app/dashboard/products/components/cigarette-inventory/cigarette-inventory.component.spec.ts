import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigaretteInventoryComponent } from './cigarette-inventory.component';

describe('CigaretteInventoryComponent', () => {
  let component: CigaretteInventoryComponent;
  let fixture: ComponentFixture<CigaretteInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CigaretteInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CigaretteInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
