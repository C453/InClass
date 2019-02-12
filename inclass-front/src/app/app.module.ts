
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from "angular2-materialize";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import {AuthService} from "./services/auth.service";
import { ActionCableService, Channel } from 'angular2-actioncable';
import {AuthGuard} from "./guards/auth.guard";

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
    CreateQuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
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
