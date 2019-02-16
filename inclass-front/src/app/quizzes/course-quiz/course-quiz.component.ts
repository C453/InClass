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

  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  seeResults (quizId) {
    this.authTokenService.get('get_recent_quiz_questions/' + quizId).subscribe(result =>{
      this.recentQuizQuestions = result.json()
      console.log(this.recentQuizQuestions)
    })
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeResults () {
    this.modalActions.emit({action: "modal", params:['close']});
  }

}
