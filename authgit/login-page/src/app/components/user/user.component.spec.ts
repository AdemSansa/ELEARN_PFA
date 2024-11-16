import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponentfetch } from './user.component';

describe('UserComponent', () => {
  let component: UserComponentfetch;
  let fixture: ComponentFixture<UserComponentfetch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponentfetch]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComponentfetch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
