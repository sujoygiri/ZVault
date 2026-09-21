import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudRestore } from './cloud-restore';

describe('CloudRestore', () => {
  let component: CloudRestore;
  let fixture: ComponentFixture<CloudRestore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudRestore],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudRestore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
