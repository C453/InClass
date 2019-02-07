import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseQuizComponent } from './course-quiz.component';

describe('CourseQuizComponent', () => {
  let component: CourseQuizComponent;
  let fixture: ComponentFixture<CourseQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
