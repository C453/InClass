import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPowerpointDialogComponent } from './view-powerpoint-dialog.component';

describe('ViewPowerpointDialogComponent', () => {
  let component: ViewPowerpointDialogComponent;
  let fixture: ComponentFixture<ViewPowerpointDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPowerpointDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPowerpointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
