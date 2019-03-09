import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from 'angular2-token';
import { Channel, ActionCableService } from 'angular2-actioncable';
import { CourseDetailComponent } from '../courses/course-detail.component';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-view-powerpoint-dialog',
  templateUrl: './view-powerpoint-dialog.component.html',
  styleUrls: ['./view-powerpoint-dialog.component.css']
})
export class ViewPowerpointDialogComponent implements OnInit {
  @Input() powerpointSource: string;
  @Input() courseID: number;
  @Input() courseData: Course;
  page: number = 1;
  professorPage: number = 1;
  subscription;

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService, private cableService: ActionCableService) { 
      const courseChannel: Channel = this.cableService
      .cable('ws://127.0.0.1:3000/cable')
      .channel('CourseChannel', { user_id: this.authTokenService.currentUserData.id });

      this.subscription = courseChannel.received().subscribe(data => { 
        if (data.status === 'move_page') {
          if (this.page == this.professorPage) {
            this.page = data.page;
          }
          this.professorPage = data.page;
        } else if (data.status === 'slides') {
          console.log('NEW SLIDES OMG');
          console.log(data);
        }
      });
    }

  ngOnInit() {
  }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  goBack() {
    if (this.page > 1) this.page--;
    this.sendPageMovementData();
  }

  goForward() {
    this.page++;
    this.sendPageMovementData();
  }

  catchUpPage() {
    this.page = this.professorPage;
  }
  
  sendPageMovementData() {
    if (this.courseData.admins.includes(this.authTokenService.currentUserData.id.toString())) {
      this.authTokenService.post('move_page', { page_number: this.page, course: this.courseID }).subscribe(res => {
        let data = res.json();
        });
    }
  }
}
