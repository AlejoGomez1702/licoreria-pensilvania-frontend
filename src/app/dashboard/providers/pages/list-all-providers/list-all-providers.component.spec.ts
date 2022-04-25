import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllProvidersComponent } from './list-all-providers.component';

describe('ListAllProvidersComponent', () => {
  let component: ListAllProvidersComponent;
  let fixture: ComponentFixture<ListAllProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
