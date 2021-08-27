import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductDialogComponent } from './create-product-dialog.component';

describe('CreateProductDialogComponent', () => {
  let component: CreateProductDialogComponent;
  let fixture: ComponentFixture<CreateProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
