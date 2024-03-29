import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
@Pipe({
  name: 'unique',
  pure: false
})

export class UniquePipe implements PipeTransform {
    transform(value: any): any{
        if(value!== undefined && value!== null){
            return _.uniqBy(value, 'date');
        }
        return value;
    }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from "angular2-materialize";
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import {AuthService} from "./services/auth.service";
import { ActionCableService, Channel } from 'angular2-actioncable';
import {AuthGuard} from "./guards/auth.guard";
import { QRCodeModule } from 'angular2-qrcode';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from './navbar/navbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { CourseDetailComponent } from './courses/course-detail.component';
import { CourseQuizComponent } from './quizzes/course-quiz/course-quiz.component';
import { CreateQuizComponent } from './quizzes/create-quiz/create-quiz.component'
import { CreateCourseDialogComponent } from './create-course-dialog/create-course-dialog.component';
import { TakeQuizComponent } from './quizzes/take-quiz/take-quiz.component';
import { ViewPowerpointDialogComponent } from './view-powerpoint-dialog/view-powerpoint-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';
import { StudentAttendanceDialogComponent } from './student-attendance-dialog/student-attendance-dialog.component';
import { GradesDialogComponent } from './grades-dialog/grades-dialog.component';
import { SlideUploadDialogComponent } from './slide-upload-dialog/slide-upload-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    CoursesComponent,
    CoursesComponent,
    AddCourseDialogComponent,
    CourseDetailComponent,
    CreateCourseDialogComponent,
    CourseQuizComponent,
    CreateQuizComponent,
    TakeQuizComponent,
    FileUploadDialogComponent,
    AttendanceDialogComponent,
    StudentAttendanceDialogComponent,
    GradesDialogComponent,
    ViewPowerpointDialogComponent,
    FileUploadDialogComponent,
    SlideUploadDialogComponent,
    UniquePipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgQrScannerModule,
    PdfViewerModule,
    QRCodeModule,
    ZXingScannerModule
    ],
  providers: [ 
    Angular2TokenService,
    AuthService,
    AuthGuard,
    ActionCableService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

