import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-slide-upload-dialog',
  templateUrl: './slide-upload-dialog.component.html',
  styleUrls: ['./slide-upload-dialog.component.css']
})
export class SlideUploadDialogComponent implements OnInit {

  fileToUpload: File = null;

  fileUpload = {
    name: '',
    expires: '2019-01-01',
  }
  @Input() courseID;
  modalActions = new EventEmitter<string|MaterializeAction>();
  expiresActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }
  
  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  ngOnInit() { 
  }

  uploadFile() {

    let formData = new FormData();
    let params = { document: { name: this.fileUpload.name, expires: this.fileUpload.expires, file: this.fileToUpload, course: this.courseID}}
    formData.set('name', this.fileUpload.name)
    formData.set('expires', this.fileUpload.expires)
    formData.set('course', this.courseID)
    formData.set('file', this.fileToUpload)

    this.uploadFiles(formData);
  }

  onFileChange(files) {
    console.log(files);
    if (files.item(0).name.includes('.pdf')) {
      this.fileToUpload = files.item(0);
    } else {
      alert('Invalid file format!');
      this.fileToUpload = null;
    }
  }

  uploadFiles(formData) {
    let headers = this.authTokenService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = { headers: headers };

    this.authTokenService.request({
      method: 'post',
      url: environment.token_auth_config.apiBase + `/slides`,
      body: formData,
      headers: options.headers
    }).subscribe(res => {
      this.closeDialog();
    });
  }
}
