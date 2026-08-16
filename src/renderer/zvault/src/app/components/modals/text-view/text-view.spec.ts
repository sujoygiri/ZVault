import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextView } from './text-view';

describe('TextView', () => {
  let component: TextView;
  let fixture: ComponentFixture<TextView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextView],
    }).compileComponents();

    fixture = TestBed.createComponent(TextView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
