import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryManagementComponent } from './admin-category-management.component';

describe('AdminCategoryManagementComponent', () => {
  let component: AdminCategoryManagementComponent;
  let fixture: ComponentFixture<AdminCategoryManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryManagementComponent]
    });
    fixture = TestBed.createComponent(AdminCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
