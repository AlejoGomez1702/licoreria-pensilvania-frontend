import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProvidersComponent } from './crud-providers.component';

describe('CrudProvidersComponent', () => {
  let component: CrudProvidersComponent;
  let fixture: ComponentFixture<CrudProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
