import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritInventoryComponent } from './spirit-inventory.component';

describe('SpiritInventoryComponent', () => {
  let component: SpiritInventoryComponent;
  let fixture: ComponentFixture<SpiritInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpiritInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiritInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
