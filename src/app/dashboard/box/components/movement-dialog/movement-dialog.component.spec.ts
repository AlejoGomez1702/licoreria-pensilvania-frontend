import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDialogComponent } from './movement-dialog.component';

describe('MovementDialogComponent', () => {
  let component: MovementDialogComponent;
  let fixture: ComponentFixture<MovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
