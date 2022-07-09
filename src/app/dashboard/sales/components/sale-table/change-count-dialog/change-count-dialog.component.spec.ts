import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCountDialogComponent } from './change-count-dialog.component';

describe('ChangeCountDialogComponent', () => {
  let component: ChangeCountDialogComponent;
  let fixture: ComponentFixture<ChangeCountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
