import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholBannerComponent } from './alcohol-banner.component';

describe('AlcoholBannerComponent', () => {
  let component: AlcoholBannerComponent;
  let fixture: ComponentFixture<AlcoholBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcoholBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
