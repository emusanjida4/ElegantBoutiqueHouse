import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrder } from './admin-order';

describe('AdminOrder', () => {
  let component: AdminOrder;
  let fixture: ComponentFixture<AdminOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
