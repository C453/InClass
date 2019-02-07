import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";

import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.css']
})

export class CreateCourseDialogComponent implements OnInit {

  createCourse = {
    name: '',
    expires: '2019-01-01',
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  expiresActions = new EventEmitter<string|MaterializeAction>();

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

  onCreateCourseSubmit(){
    this.authTokenService.post("courses", { name: this.createCourse.name, expires: this.createCourse.expires }).subscribe(result => {
      if(result.status == 201) {
        this.closeDialog()
      }
    })
  }
}
