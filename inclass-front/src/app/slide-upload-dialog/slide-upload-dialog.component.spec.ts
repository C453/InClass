import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideUploadDialogComponent } from './slide-upload-dialog.component';

describe('SlideUploadDialogComponent', () => {
  let component: SlideUploadDialogComponent;
  let fixture: ComponentFixture<SlideUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
