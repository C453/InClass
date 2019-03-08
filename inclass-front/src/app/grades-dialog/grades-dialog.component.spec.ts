import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesDialogComponent } from './grades-dialog.component';

describe('GradesDialogComponent', () => {
  let component: GradesDialogComponent;
  let fixture: ComponentFixture<GradesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
