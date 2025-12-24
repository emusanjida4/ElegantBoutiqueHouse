import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashBoard } from './admin-dash-board';

describe('AdminDashBoard', () => {
  let component: AdminDashBoard;
  let fixture: ComponentFixture<AdminDashBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
