import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllClientsComponent } from './list-all-clients.component';

describe('ListAllClientsComponent', () => {
  let component: ListAllClientsComponent;
  let fixture: ComponentFixture<ListAllClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
