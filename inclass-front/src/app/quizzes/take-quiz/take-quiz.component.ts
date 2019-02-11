import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  takeQuiz () {
    this.modalActions.emit({action:"modal", params:['open']});
  }

  submitQuiz () {
    console.log("QUIZ SUBMITTED");
    this.closeQuiz();
  }

  closeQuiz () {
    this.modalActions.emit({action: "modal", params:['close']});
  }

}
