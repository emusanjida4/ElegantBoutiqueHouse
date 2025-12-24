import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubCategory } from './admin-sub-category';

describe('AdminSubCategory', () => {
  let component: AdminSubCategory;
  let fixture: ComponentFixture<AdminSubCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSubCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
