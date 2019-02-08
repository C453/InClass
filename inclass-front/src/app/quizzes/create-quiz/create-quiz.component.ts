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
    // Handle empty questions
    if (this.newQuestionText.trim() === '') {
      this.newQuestionText = '';
      return;
    }

    this.quizQuestions.push({ 
      id: this.quizCount++,
      text: this.newQuestionText,
      answerCount: 0,
      answers: [{}],
    });

    this.newQuestionText = '';
  }

  addAnswer(questionIndex) {
    this.quizQuestions[questionIndex].answersCount++;
    this.quizQuestions[questionIndex].answers.push({});
  }

  deleteQuestion(questionIndex) {
    this.quizQuestions.splice(questionIndex, 1);
  }
}
