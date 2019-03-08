import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

import { AddCourseDialogComponent } from "../add-course-dialog/add-course-dialog.component";
import { CreateCourseDialogComponent } from "../create-course-dialog/create-course-dialog.component";

import { Subscription } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { NavbarService } from '../services/navbar.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @ViewChild('addCourseDialog') addCourseDialog: AddCourseDialogComponent;
  @ViewChild('createCourseDialog') createCourseDialog: CreateCourseDialogComponent;

  courseData: Object[];
  ownedCourseData: Object[];

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService,
    private cableService: ActionCableService,
    private router: Router,
    public nav: NavbarService) { }

  ngOnInit() {
    this.authTokenService.post("get_courses", {}).subscribe(response => {
      this.courseData = response.json();

      const coursesChannel: Channel = this.cableService
        .cable(environment.token_auth_config.socketBase)
        .channel('CoursesChannel', { user_id: this.authTokenService.currentUserData.id });
      console.log(coursesChannel);

      this.subscription = coursesChannel.received().subscribe(course => {
        console.log(course);
        if(course.status === 'create') {
          if(course.admin) {
            this.ownedCourseData.push({ id: course.id, name: course.name, code: course.code });
          }
        } else if(course.status === 'register') {
          this.courseData.push({ id: course.id, name: course.name });
        }
      });
    })

    this.authTokenService.post("get_owned_courses", {}).subscribe(response => {
      this.ownedCourseData = response.json();
    });

    this.nav.title = "Courses";
  }

  presentAddCourseDialog() {
    this.addCourseDialog.openDialog();
  }

  presentCreateCourseDialog() {
    this.createCourseDialog.openDialog();
  }

  openCourse(course) {
    this.router.navigateByUrl('courses/' + course.id)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
