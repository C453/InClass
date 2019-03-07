import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.css']
})

@Component({
  selector: 'my-qr-code-component',
  template: `
    <div>
      <qr-code [value]="" [size]="150"></qr-code>
    </div>
  `
})

export class AttendanceDialogComponent implements OnInit {

  @Input() code;
  @Input() courseId;

  modalParams = [
    {
      dismissible: false
    }
  ]

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  openDialog(){
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
