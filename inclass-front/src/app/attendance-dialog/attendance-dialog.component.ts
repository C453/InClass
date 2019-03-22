import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.css']
})

export class AttendanceDialogComponent implements OnInit {

  @Input() code;
  @Input() courseId;
  location;

  modalParams = [
    {
      dismissible: true
    }
  ]

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  openDialog(){
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(position.coords); 
      });
    }

    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  closeAttendance() {
    this.closeDialog();
    this.authTokenService.post('close_attendance', { course: this.courseId }).subscribe(res => {
      res = res.json();
      console.log(res);
    });
  }
  
}
