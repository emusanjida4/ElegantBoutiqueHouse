import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homecarousel } from './homecarousel';

describe('Homecarousel', () => {
  let component: Homecarousel;
  let fixture: ComponentFixture<Homecarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homecarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homecarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
