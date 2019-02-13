import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/course.model';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuizComponent } from '../quizzes/create-quiz/create-quiz.component';
import { CourseQuizComponent } from "../quizzes/course-quiz/course-quiz.component";
import { TakeQuizComponent } from "../quizzes/take-quiz/take-quiz.component";

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  subscription: Subscription;
  @ViewChild('createQuizDialog') createQuizComponent: CreateQuizComponent;
  @ViewChild('openQuiz') courseQuizComponent: CourseQuizComponent;
  @ViewChild('takeQuiz') takeQuizComponent: TakeQuizComponent;

  courseData: Course;
  courseDocuments: Object[];
  activeQuiz;
  activeQuizQuestions;

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService, private actr: ActivatedRoute, private router: Router) {
      this.actr.data.map(data => data.cres.json()).subscribe(res => {
        this.courseData = res;
        this.getActiveQuiz();
      });
    }

  ngOnInit() {
    // returns either all documents if the user is an admin, or only public documents if the user is just a student
    this.authTokenService.get('documents', { params: { course: this.courseData.id }}).subscribe(res => {
      this.courseDocuments = res.json();
      console.log(this.courseDocuments);
    })
  }

  getActiveQuiz() {
    this.authTokenService.get('get_active_quiz/' + this.courseData.id).subscribe(res => {
      this.activeQuiz = res.json();
      
      this.authTokenService.get('get_active_quiz_questions/' + this.activeQuiz.id)
        .subscribe(questionRes => {
        this.activeQuizQuestions = questionRes.json();
      });
    });
  }

  dropCourse() {
    this.authTokenService.post('drop_course', { code: this.courseData.code }).subscribe(res => {
      if(res.json().status === 'success') {
        this.router.navigate(['courses'])
      }
    })
  }

  createQuiz() {
    console.log(this.createQuizComponent);
    this.createQuizComponent.openDialog();
  }

  seeQuizResults() {
    this.courseQuizComponent.openQuiz();
  }

  takeTheQuiz () {
    this.takeQuizComponent.takeQuiz();
  }
}
