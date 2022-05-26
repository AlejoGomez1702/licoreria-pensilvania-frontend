import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturistInventoryComponent } from './naturist-inventory.component';

describe('NaturistInventoryComponent', () => {
  let component: NaturistInventoryComponent;
  let fixture: ComponentFixture<NaturistInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturistInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturistInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
