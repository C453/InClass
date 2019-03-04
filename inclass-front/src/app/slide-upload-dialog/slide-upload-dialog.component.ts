import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-slide-upload-dialog',
  templateUrl: './slide-upload-dialog.component.html',
  styleUrls: ['./slide-upload-dialog.component.css']
})
export class SlideUploadDialogComponent implements OnInit {
  fileToUpload: File = null;

  fileUpload = {
    expires: '2019-01-01',
    topic: '',
  }
  @Input() courseID;
  modalActions = new EventEmitter<string|MaterializeAction>();
  expiresActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService, public authService: AuthService) { }

  ngOnInit() { }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }
  
  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  uploadFile() {

    let formData = new FormData();
    let params = { slide: 
      { topic: this.fileUpload.topic, 
        expires: this.fileUpload.expires, 
        file: this.fileToUpload, 
        course: this.courseID
      }
    };
    
    formData.set('topic', this.fileUpload.topic)
    formData.set('expires', this.fileUpload.expires)
    formData.set('course', this.courseID)
    formData.set('file', this.fileToUpload)

    this.uploadFiles(formData);
  }

  onFileChange(files) {
    this.fileToUpload = files.item(0);
  }

  uploadFiles(formData) {
    let headers = this.authTokenService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = { headers: headers };

    this.authTokenService.request({
      method: 'post',
      url: `http://localhost:3000/slides`,
      body: formData,
      headers: options.headers
    }).subscribe(res => {
      this.closeDialog();
    });
  }
}
