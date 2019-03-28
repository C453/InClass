import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/course.model';
import { RouterModule, Routes } from '@angular/router';
import {formatDate} from '@angular/common';

import { CreateQuizComponent } from '../quizzes/create-quiz/create-quiz.component';
import { CourseQuizComponent } from "../quizzes/course-quiz/course-quiz.component";
import { TakeQuizComponent } from "../quizzes/take-quiz/take-quiz.component";
import { FileUploadDialogComponent } from "../file-upload-dialog/file-upload-dialog.component";

import { Subscription } from 'rxjs';
import { Question } from '../models/question.model';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { NavbarService } from '../services/navbar.service';
import { AttendanceDialogComponent } from '../attendance-dialog/attendance-dialog.component';
import {StudentAttendanceDialogComponent} from '../student-attendance-dialog/student-attendance-dialog.component';
import {GradesDialogComponent} from '../grades-dialog/grades-dialog.component';
import { ViewPowerpointDialogComponent } from '../view-powerpoint-dialog/view-powerpoint-dialog.component';
import { SlideUploadDialogComponent } from '../slide-upload-dialog/slide-upload-dialog.component';
import { CodeNode } from 'source-list-map';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  subscription: Subscription;
  addQuizSubscription: Subscription;
  closeQuizSubscription: Subscription;

  @ViewChild('fileUploadDialog') uploadFileDialogComponet: FileUploadDialogComponent;
  @ViewChild('createQuizDialog') createQuizComponent: CreateQuizComponent;
  @ViewChild('seeResults') courseQuizComponent: CourseQuizComponent;
  @ViewChild('takeQuiz') takeQuizComponent: TakeQuizComponent;
  @ViewChild('attendanceDialog') attendanceDialogComponent: AttendanceDialogComponent;
  @ViewChild('studentAttendanceDialog') StudentAttendanceDialogComponent: StudentAttendanceDialogComponent;
  @ViewChild('gradesDialog') GradesDialogComponent: GradesDialogComponent; 
  @ViewChild('viewPowerpoint') viewPowerpointDialogComponent: ViewPowerpointDialogComponent;
  @ViewChild('slideUploadDialog') slideUploadDialogComponent: SlideUploadDialogComponent

  courseData: Course;
  courseDocuments: Object[];
  courseSlides: Object[];
  courseQuestions: Question[];
  activeQuiz;
  activeQuizQuestions;
  questionArea: string;
  recentQuiz;
  recentQuizQuestions;
  activePowerpoint;
  open;
  code: string;
  grades;
  location;

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService, private actr: ActivatedRoute, private router: Router, private cableService: ActionCableService, public nav: NavbarService) {
      this.actr.data.map(data => data.cres.json()).subscribe(res => {
        this.courseData = res;
        this.getActiveQuiz();
      });
    }

  ngOnInit() {
    this.checkAttendanceOpen();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(position.coords); 
      });
    }

    // returns either all documents if the user is an admin, or only public documents if the user is just a student
    this.authTokenService.get('documents', { params: { course: this.courseData.id } }).subscribe(res => {
      this.courseDocuments = res.json();
    });

    this.authTokenService.get('slides', { params: { course: this.courseData.id } }).subscribe( res => {
      this.courseSlides = res.json();
      console.log(this.courseSlides);
      if (this.courseSlides.length == 1) {
        this.activePowerpoint = environment.token_auth_config.apiBase + this.courseSlides[0]['url'];
        console.log('Active powerpoint: ' + this.activePowerpoint);
      }
    });

    this.authTokenService.post('get_grade', { course: this.courseData.id }).subscribe(res => {
      this.grades = res.json();
    });

    const addQuizChannel: Channel = this.cableService
    .cable(environment.token_auth_config.socketBase)
    .channel('AddQuizChannel', { user_id: this.authTokenService.currentUserData.id });

    const closeQuizChannel: Channel = this.cableService
    .cable(environment.token_auth_config.socketBase)
    .channel('CloseQuizChannel', { user_id: this.authTokenService.currentUserData.id });

    // get all questions via REST
    this.authTokenService.get('questions', { params: { course: this.courseData.id } }).subscribe(res => {
      this.courseQuestions = res.json();
      console.log(this.courseQuestions);

      // create connection to stream course data
      const courseChannel: Channel = this.cableService
        .cable(environment.token_auth_config.socketBase)
        .channel('CourseChannel', { course_id: this.courseData.id });
      console.log(courseChannel);

      // sort the questions by yeah count
      this.courseQuestions.sort((left, right): number => {
        if (left.yeah_count > right.yeah_count) return -1;
        if (left.yeah_count < right.yeah_count) return 1;
        return 0;
      });

      // when the server streams us course data
      this.subscription = courseChannel.received().subscribe(data => {
        if (data.status === 'new_question') {
          // create a new question
          var newQuestion = new Question();
          newQuestion.id = data.id;
          newQuestion.user_id = data.user_id;
          newQuestion.question = data.question;
          newQuestion.yeah_count = data.yeah_count;
          newQuestion.yeahs = data.yeahs;
          newQuestion.course_id = data.course_id;
          newQuestion.answered = data.answered;
          newQuestion.created_at = data.created_at;
          newQuestion.updated_at = data.updated_at;

          // add new question to question array
          this.courseQuestions.push(newQuestion);

        } else if (data.status === 'yeah') {
          // find the question that has been yeahd
          var q: Question = this.courseQuestions.filter(q => q.id === data.id)[0];
          q.yeah_count = data.yeah_count

          this.courseQuestions.sort((left, right): number => {
            if (left.yeah_count > right.yeah_count) return -1;
            if (left.yeah_count < right.yeah_count) return 1;
            return 0;
          });
        } else if (data.status === 'question_answered') {
          this.courseQuestions = this.courseQuestions.filter(q => q.id !== data.id);
        } else if (data.status === 'new_quiz') {
          this.getActiveQuiz();
        } else if (data.status === 'close_quiz') {
          this.activeQuiz = undefined;
          this.getRecentQuiz();
        } else if (data.status === 'open_attendance') {
          this.open = true;
          // TODO: when attendance is opened
        } else if (data.status === 'close_attendance') {
          this.open = false;
          // TODO: when attendance is closed
        } else if (data.status === 'attendance') {
          // TODO: when someone marks themselves present
        } else if (data.status === 'document') {
          this.courseDocuments.push({name: data.file.name, url: data.file.url});
        } else if (data.status === 'slides') {
          console.log('NEW SLIDES BABY!');
          console.log(data);
        }
      });
    })

    // Get the most recent quiz that isn't active
    this.getRecentQuiz();
    
    // set the title of the navbar to the course name
    this.nav.title = this.courseData.name;
  }

  getActiveQuiz() {
    this.authTokenService.get('get_active_quiz/' + this.courseData.id).subscribe(res => {
      this.activeQuiz = res.json();
      if(this.activeQuiz) {
      this.authTokenService.get('get_active_quiz_questions/' + this.activeQuiz.id)
        .subscribe(questionRes => {
        this.activeQuizQuestions = questionRes.json();
      });
    }
    });
  }

  getRecentQuiz () {
    this.authTokenService.get('get_recent_quiz/' + this.courseData.id).subscribe(result =>{
        this.recentQuiz = result.json();
    });
  }

  dropCourse() {
    this.authTokenService.post('drop_course', { code: this.courseData.code }).subscribe(res => {
      if (res.json().status === 'success') {
        this.router.navigate(['courses'])
      }
    })
  }

  postQuestion() {
    console.log(this.questionArea);
    if (this.questionArea === null || this.questionArea === '') {
      alert("No blank questions!");
      return;
    }

    this.authTokenService.post('questions', { question: { user_id: this.authTokenService.currentUserData.id, question: this.questionArea, yeah_count: 0, course_id: this.courseData.id, answered: false } }).subscribe(res => {
      this.questionArea = null;
    }) 
  }

  yeahQuestion(question: Question) {
    this.authTokenService.post('yeah', { question: question.id }).subscribe(res => {
      console.log(res.json());
      this.questionArea = null;

      if (question.yeahs.includes(this.authTokenService.currentUserData.id.toString())) {
        question.yeahs = question.yeahs.filter(id => id != this.authTokenService.currentUserData.id.toString());
      } else {
        question.yeahs.push(this.authTokenService.currentUserData.id.toString());
      }

      console.log(question.yeahs.includes(this.authTokenService.currentUserData.id.toString()));
      
      document.getElementById("yeah_" + question.id).innerHTML = question.yeahs.includes(this.authTokenService.currentUserData.id.toString()) ? "Unyeah! " + question.yeah_count : "Yeah! " + question.yeah_count
    })
  }

  answerQuestion(question: Question) {
    this.authTokenService.post('answer_question', { question: question.id }).subscribe(res => {
      console.log(res.json());
    });
  }

  InputOverviewExample() { }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
    if (e.target.scrollHeight > 200) {
      e.target.style.height = "200px";
    }
  }
  createQuiz() {
    this.createQuizComponent.openDialog();
  }

  displayQuiz () {
    this.takeQuizComponent.takeQuiz(this.activeQuizQuestions, this.activeQuiz)
  }

  closeQuiz() {
    this.authTokenService.post('close_quiz', { id: this.activeQuiz.id }).subscribe(response => {
      if (response.json().success) {
        this.activeQuiz = undefined;
        this.activeQuizQuestions = undefined;
      }
    });
  }

  downloadFile(file) {
    window.open(environment.token_auth_config.apiBase + file.url);
  }

  uploadFile() {
    this.uploadFileDialogComponet.openDialog();
  }

  openResults () {
    this.courseQuizComponent.seeResults(this.recentQuiz.id, this.courseData.id)
  }

  displayPowerpoint() {
    this.viewPowerpointDialogComponent.openDialog();
  }

  showSlideUploadDialog() {
    this.slideUploadDialogComponent.openDialog();
  }

  checkAttendanceOpen() {
    this.authTokenService.post('check_attendance', { course: this.courseData.id }).subscribe(res => {
      res = res.json();
      console.log(res);
      this.open = res.status; 
    });
  }
  
  studentTakeAttendance(){
	  this.authTokenService.post('take_attendance', { course: this.courseData.id, code:'' }).subscribe(res => {
      res = res.json();
      console.log(res);
    });
	  
    }


  takeAttendance() {
    var date = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.authTokenService.post('attendances', { date: date, course_id: this.courseData.id, latitude: this.location.latitude, longitude: this.location.longitude}).subscribe(res => {
      res = res.json();
      this.code = res["code"];
      this.openAttendanceDialog();
    });

    // TODO: Get generated QR Code from response and display it in a dialog.
  }

  openAttendanceDialog() {
    this.attendanceDialogComponent.openDialog();
  }

  openStudentAttendanceDialog() {
    this.StudentAttendanceDialogComponent.openDialog();
  }

  openGradesDialog(){
    this.GradesDialogComponent.openDialog(); 
  }

  closeAttendance() {
    this.authTokenService.post('close_attendance', { course: this.courseData.id }).subscribe(res => {
      res = res.json();
      console.log(res);
    });
  }
}