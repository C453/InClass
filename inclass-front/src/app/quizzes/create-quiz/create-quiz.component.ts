import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();
  expiresActions = new EventEmitter<string|MaterializeAction>();

  @Input() courseID;
  quizQuestions = [];
  newQuestionText = '';
  quizCount = 0;
  
  constructor(private authTokenService: Angular2TokenService) { }

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
      answers: [{
        text: '',
        correct: true,
      }],
    });

    this.newQuestionText = '';
  }

  addAnswer(questionIndex) {
    this.quizQuestions[questionIndex].answers.push({
      text: '',
      correct: false,
    });
  }

  changeAnswer(answer, event) {
    answer.text = event.target.value;
  }

  selectCorrectAnswer(question, newAnswer) {
    question.answers.forEach(answer => {
      answer.correct = false;
    });

    newAnswer.correct = true;
  }

  deleteQuestion(questionIndex) {
    this.quizQuestions.splice(questionIndex, 1);
  }

  submitQuiz() {
    // Create quiz
    this.authTokenService.post('quizzes', {
      status: true,
      course_id: this.courseID
    }).subscribe(result => {
      let body = JSON.parse(result['_body']);
      let newQuizID = body.id;
      this.sendAnswers(newQuizID);
      this.closeDialog();
    });
  }

  sendAnswers(quizID) {
    this.quizQuestions.forEach(question => {
      let correctIndex = 0;
      let rawAnswers = [];
      for (let i = 0; i < question.answers.length; i++) {
        rawAnswers.push(question.answers[i].text);
        if (question.answers[i].correct) {
          correctIndex = i;
        }
      }

      let questionObject = {
        text: question.text,
        quiz_id: quizID,
        answers: JSON.stringify(rawAnswers),
        correct: correctIndex,
      }

      this.authTokenService.post('quiz_questions', questionObject);
    });
  }
}
