import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVault } from './delete-vault';

describe('DeleteVault', () => {
  let component: DeleteVault;
  let fixture: ComponentFixture<DeleteVault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVault],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteVault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
