import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { AuthService } from "../../services/auth.service";
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-course-quiz',
  templateUrl: './course-quiz.component.html',
  styleUrls: ['./course-quiz.component.css']
})
export class CourseQuizComponent implements OnInit {

  recentQuizQuestions;
  submissions;
  quiz;
  course;
  average;

  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) {
      this.submissions = []
     }

  ngOnInit() {
    
  }

  seeResults (quizId, courseId) {
    this.quiz = quizId
    this.course = courseId
    this.authTokenService.get('get_recent_quiz_questions/' + quizId).subscribe(result =>{
      this.recentQuizQuestions = result.json()
      this.authTokenService.get('get_quiz_submissions/' + this.course + '/' + this.quiz).subscribe(result => {
        this.submissions = result.json()
        this.processSubmissions()
      })
    })

    this.modalActions.emit({action:"modal", params:['open']});
  }

  processSubmissions () {
    this.average = 0;
    var total = this.recentQuizQuestions.length
    console.log(total)
    var amt = this.submissions.length
    for (var j = 0; j < total; j++) { //Check the amt for each question
      for (var i = 0; i < amt; i++) {
        this.average += this.submissions[i].score
      }
      this.average = (this.average / i) * 100
      this.average = this.average.toFixed(2)
    }
  }

  closeResults () {
    this.modalActions.emit({action: "modal", params:['close']});
  }

}
