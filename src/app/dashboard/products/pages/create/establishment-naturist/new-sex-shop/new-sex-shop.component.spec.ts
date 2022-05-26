import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSexShopComponent } from './new-sex-shop.component';

describe('NewSexShopComponent', () => {
  let component: NewSexShopComponent;
  let fixture: ComponentFixture<NewSexShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSexShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSexShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
