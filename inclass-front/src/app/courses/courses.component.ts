import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

import { AddCourseDialogComponent } from "../add-course-dialog/add-course-dialog.component";

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

  courseData: Object[];
  
  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService,
    private cableService: ActionCableService,
    private router: Router) { }

  ngOnInit() {
    this.authTokenService.post("get_courses", {}).subscribe(response => {
      this.courseData = response.json();

      const channel: Channel = this.cableService
      .cable('ws://127.0.0.1:3000/cable')
      .channel('AddCourseChannel', { user_id: this.authTokenService.currentUserData.id });
      console.log(channel);

    this.subscription = channel.received().subscribe(course => {
      console.log(course);
      this.courseData.push({ id: course.id, name: course.name });
    });
    })
  }

  presentAddCourseDialog(){
    this.addCourseDialog.openDialog();
  }
  
  openCourse(course) {
     this.router.navigateByUrl('courses/' + course.id)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
