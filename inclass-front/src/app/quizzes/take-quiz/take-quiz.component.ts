import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { AuthService } from "../../services/auth.service";
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  selectedAnswer;

  curQuizQuestion;
  curQuiz;

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) {
    this.curQuiz = {}
    this.curQuizQuestion = {}
  }

  ngOnInit() {
  }

  takeQuiz (quizQuestion, quiz) {
    this.curQuiz = quiz
    this.curQuizQuestion = quizQuestion;
    this.modalActions.emit({action:"modal", params:['open']});
    
  }

  submitQuiz () {
    var score = 0;
    if (this.curQuizQuestion.correct == this.selectedAnswer) {
      score += 1
    }

    this.authTokenService.post("quiz_submissions",
      { quiz_id: this.curQuiz.id, score: score, course_id: this.curQuiz.course_id}).subscribe(result => {
      if(result.status == 201) {
        this.closeQuiz();
      }
    })
    
  }

  closeQuiz () {
    this.modalActions.emit({action: "modal", params:['close']});
  }

  changeAnswer (event: any) {
    this.selectedAnswer = event.target.value
  }

}
