import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import { MaterializeAction } from "angular2-materialize";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  @Input('auth-mode') authMode: 'Login' | 'Register' = 'Login';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() {

  }

  onLoginFormResult(e){


    if(e.signedIn)
      this.closeDialog();
    else{
      alert(e.err.json().errors[0])
    }
  }

  onRegisterFormResult(e){
    if(e.signedUp)
      this.closeDialog();
    else{
      alert(e.err.json().errors.full_messages[0])
    }
  }



  openDialog(mode: 'Login' | 'Register' = 'Login'){
    this.authMode = mode;
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  ngOnInit() {
  }

  isLoginMode(){return this.authMode == 'Login'}
  isRegisterMode(){return this.authMode == 'Register'}


}