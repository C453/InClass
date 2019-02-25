import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-view-powerpoint-dialog',
  templateUrl: './view-powerpoint-dialog.component.html',
  styleUrls: ['./view-powerpoint-dialog.component.css']
})
export class ViewPowerpointDialogComponent implements OnInit {
  @Input() powerpointSource: string;
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
}
