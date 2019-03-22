import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { AuthService } from "../../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import * as questions from '../../globals';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  selectedAnswers;

  curQuizQuestions;
  curQuiz;
  grade;


  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) {
    this.curQuiz = {}
    this.selectedAnswers = [];

  }

  ngOnInit() {
    this.grade = 0;
  }

  takeQuiz (quizQuestions, quiz) {
    this.curQuiz = quiz
    this.curQuizQuestions = quizQuestions;
    this.modalActions.emit({action:"modal", params:['open']});
  }

  submitQuiz () {
    if (this.validForm()){
      this.grade = 0;
      this.processQuestions()
      // Put this out side of conditional for bug, it will keep adding score
      this.authTokenService.post("quiz_submissions",
        { quiz_id: this.curQuiz.id, score: this.grade, course_id: this.curQuiz.course_id }).subscribe(result => {
        if(result.status == 200 || result.status == 201) {
          this.closeQuiz();
        }
      })
      
    }
    else{
      alert("Please fill out the whole quiz")
    }
  }

  processQuestions () {
    var quizToGrade;
    var correctAnswer;

    for(var i = 0; i < this.curQuizQuestions.length; i++) {

        quizToGrade = document.forms[`quiz${i}`]
        correctAnswer = this.curQuizQuestions[i].correct

        var inputs = quizToGrade.getElementsByTagName("input")

        for (var j = 0; j < inputs.length; j++) {
          if ((inputs[j].checked == true) && (j == correctAnswer)) {
            this.grade = this.grade + questions.ANS
          }
        }
      }
  }

  validForm () {
    var buttons = 0
    var form;
    console.log(this.curQuizQuestions.length)

    for(var i = 0; i < this.curQuizQuestions.length; i++) {

      form = document.forms[`quiz${i}`]

      var inputs = form.getElementsByTagName("input")

      for (var j = 0; j < inputs.length; j++) {
        if ((inputs[j].checked == true)) {
          buttons++;
        }
      }
    }

    if (buttons === this.curQuizQuestions.length) {
      return false
    }
    return true
  }

  closeQuiz () {
    this.modalActions.emit({action: "modal", params:['close']});
  }
}
