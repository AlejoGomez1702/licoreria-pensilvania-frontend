import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootContentComponent } from './root-content.component';

describe('RootContentComponent', () => {
  let component: RootContentComponent;
  let fixture: ComponentFixture<RootContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
