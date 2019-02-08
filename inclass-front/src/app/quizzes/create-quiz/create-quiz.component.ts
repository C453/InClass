import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();
  expiresActions = new EventEmitter<string|MaterializeAction>();

  quizQuestions = [];
  newQuestionText = '';
  quizCount = 0;
  
  constructor() { }

  ngOnInit() {
  }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  addQuestion() {
    this.quizQuestions.push({ 
      id: this.quizCount++,
      text: this.newQuestionText,
      answers: [],
      answerCount: 0
    });

    this.newQuestionText = '';
  }

  addAnswer(questionIndex) {
    this.quizQuestions[questionIndex].answersCount++;
  }

  // Stupid hack because Angular is dumb and doesn't allow *ngFor without some type of generic to iterate over.
  generateDummyArray(count) {
    return new Array(count).fill(1);
  }
}
