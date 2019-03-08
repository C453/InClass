import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceDialogComponent } from './student-attendance-dialog.component';

describe('StudentAttendanceDialogComponent', () => {
  let component: StudentAttendanceDialogComponent;
  let fixture: ComponentFixture<StudentAttendanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
