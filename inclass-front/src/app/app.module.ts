
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from "angular2-materialize";
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";

import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from './navbar/navbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
  ],
  providers: [ Angular2TokenService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
