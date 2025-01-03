import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementDialogComponent } from './role-management.component';

describe('RoleManagementComponent', () => {
  let component: RoleManagementDialogComponent;
  let fixture: ComponentFixture<RoleManagementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleManagementDialogComponent]
    });
    fixture = TestBed.createComponent(RoleManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
