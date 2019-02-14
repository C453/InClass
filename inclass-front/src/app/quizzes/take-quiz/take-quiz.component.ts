import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();
  curQuizQuestion;
  selectedAnswer;

  constructor() {

    this.curQuizQuestion = {
      text: "",
      answers: [],
      correct: -1
    };

    this.selectedAnswer = -1
   }

  ngOnInit() {
  }

  takeQuiz (QuizQuestion) {
    this.modalActions.emit({action:"modal", params:['open']});
    this.curQuizQuestion = QuizQuestion;
  }


  submitQuiz () {
    var selectedAnswer = document.getElementsByName("selectedAnswer")
    console.log(selectedAnswer)
    this.closeQuiz();
  }

  closeQuiz () {
    this.modalActions.emit({action: "modal", params:['close']});
  }

}
