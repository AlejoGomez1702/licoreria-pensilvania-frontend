import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabCartComponent } from './fab-cart.component';

describe('FabCartComponent', () => {
  let component: FabCartComponent;
  let fixture: ComponentFixture<FabCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
