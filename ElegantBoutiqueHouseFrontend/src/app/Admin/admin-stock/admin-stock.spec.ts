import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStock } from './admin-stock';

describe('AdminStock', () => {
  let component: AdminStock;
  let fixture: ComponentFixture<AdminStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
