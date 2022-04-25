import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProviderDialogComponent } from './new-provider-dialog.component';

describe('NewProviderDialogComponent', () => {
  let component: NewProviderDialogComponent;
  let fixture: ComponentFixture<NewProviderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProviderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
