import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-grades-dialog',
  templateUrl: './grades-dialog.component.html',
  styleUrls: ['./grades-dialog.component.css']
})


export class GradesDialogComponent implements OnInit {
  
  @Input() courseId;
  grades: Object; 

  modalParams = [
    {
      dismissible: false
    }
  ]

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  ngOnInit() {
    this.getGrades();
  }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }
  
  getGrades(){
    this.authTokenService.post('get_grade', { course: this.courseId }).subscribe(res => {
      this.grades = res.json();
      console.log(res);
    });
    
  }


}
