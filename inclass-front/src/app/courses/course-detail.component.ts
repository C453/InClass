import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/course.model';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from '../quizzes/create-quiz/create-quiz.component';
import { Subscription } from 'rxjs';
import { Question } from '../models/question.model';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  subscription: Subscription;
  addQuizSubscription: Subscription;
  closeQuizSubscription: Subscription;

  @ViewChild('createQuizDialog') createQuizComponent: CreateQuizComponent;
  courseData: Course;
  courseDocuments: Object[];
  courseQuestions: Question[];
  activeQuiz;
  activeQuizQuestions;
  questionArea: string;

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService, private actr: ActivatedRoute, private router: Router, private cableService: ActionCableService, public nav: NavbarService) {
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
    });

    const addQuizChannel: Channel = this.cableService
    .cable('ws://127.0.0.1:3000/cable')
    .channel('AddQuizChannel', { user_id: this.authTokenService.currentUserData.id });

    const closeQuizChannel: Channel = this.cableService
    .cable('ws://127.0.0.1:3000/cable')
    .channel('CloseQuizChannel', { user_id: this.authTokenService.currentUserData.id });

    this.addQuizSubscription = addQuizChannel.received().subscribe(quiz => {
      if (quiz.course_id === this.courseData.id) {
        this.getActiveQuiz();
      }
    });

    this.closeQuizSubscription = closeQuizChannel.received().subscribe(quiz => {
      if (quiz.course_id === this.courseData.id) {
        this.activeQuiz = undefined;
      }
    });

    this.authTokenService.get('questions', { params: { course: this.courseData.id }}).subscribe(res => {
      this.courseQuestions = res.json();
      console.log(this.courseQuestions);

      const courseChannel: Channel = this.cableService
        .cable('ws://127.0.0.1:3000/cable')
        .channel('CourseChannel', { course_id: this.courseData.id });
      console.log(courseChannel);

      this.subscription = courseChannel.received().subscribe(data => {
        console.log(data);
        if(data.status === 'new_question') {
          var newQuestion = new Question();
          newQuestion.id = data.id;
          newQuestion.user_id = data.user_id;
          newQuestion.question = data.question;
          newQuestion.yeah_count = data.yeah_count;
          newQuestion.course_id = data.course_id;
          newQuestion.answered = data.answered;
          newQuestion.created_at = data.created_at;
          newQuestion.updated_at = data.updated_at;

          this.courseQuestions.push(newQuestion);
        }
      });
    })

    this.nav.title = this.courseData.name;
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
  
  postQuestion(){
	this.authTokenService.post('questions', { question : { user_id: this.authTokenService.currentUserData.id, question: this.questionArea, yeah_count: 0, course_id: this.courseData.id, answered: false } } ).subscribe(res => {  
      this.questionArea = null;
    }) 
  }
InputOverviewExample() {} 

autoGrowTextZone(e) {
  e.target.style.height = "0px";
  e.target.style.height = (e.target.scrollHeight + 25)+"px";
  if(e.target.scrollHeight > 300){
	  e.target.style.height = "200px"; 
}
}
  createQuiz() {
    this.createQuizComponent.openDialog();
  }

  closeQuiz() {
    this.authTokenService.post('close_quiz', { id: this.activeQuiz.id }).subscribe(response => {
      if (response.json().success) {
        this.activeQuiz = undefined;
        this.activeQuizQuestions = undefined;
      }
    });
  }
}
