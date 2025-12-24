import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProduct } from './admin-product';

describe('AdminProduct', () => {
  let component: AdminProduct;
  let fixture: ComponentFixture<AdminProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
