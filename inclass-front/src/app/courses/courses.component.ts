import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

import { AddCourseDialogComponent } from "../add-course-dialog/add-course-dialog.component";
import { CreateCourseDialogComponent } from "../create-course-dialog/create-course-dialog.component";

import { Subscription } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';


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
    private router: Router) { }

  ngOnInit() {
    this.authTokenService.post("get_courses", {}).subscribe(response => {
      this.courseData = response.json();

      const addCourseChannel: Channel = this.cableService
        .cable('ws://127.0.0.1:3000/cable')
        .channel('AddCourseChannel', { user_id: this.authTokenService.currentUserData.id });
      console.log(addCourseChannel);

      const coursesChannel: Channel = this.cableService
        .cable('ws://127.0.0.1:3000/cable')
        .channel('CoursesChannel', { user_id: this.authTokenService.currentUserData.id });
      console.log(coursesChannel);

      this.subscription = addCourseChannel.received().subscribe(course => {
        console.log(course);
        this.courseData.push({ id: course.id, name: course.name });
      });

      this.subscription = coursesChannel.received().subscribe(course => {
        console.log(course);
        if(course.admin) {
          this.ownedCourseData.push({ id: course.id, name: course.name });
        }
      });
    })

    this.authTokenService.post("get_owned_courses", {}).subscribe(response => {
      this.ownedCourseData = response.json();
    });
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
