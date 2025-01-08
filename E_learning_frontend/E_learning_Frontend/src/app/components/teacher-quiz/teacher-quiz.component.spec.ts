import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizComponent } from './teacher-quiz.component';

describe('TeacherQuizComponent', () => {
  let component: TeacherQuizComponent;
  let fixture: ComponentFixture<TeacherQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherQuizComponent]
    });
    fixture = TestBed.createComponent(TeacherQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
