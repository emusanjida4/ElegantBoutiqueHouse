import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProduct } from './user-product';

describe('UserProduct', () => {
  let component: UserProduct;
  let fixture: ComponentFixture<UserProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
