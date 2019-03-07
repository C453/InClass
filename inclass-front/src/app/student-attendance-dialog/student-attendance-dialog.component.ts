import { Component, OnInit, EventEmitter, Input, ViewChild } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { QrScannerComponent } from 'angular2-qrscanner';


@Component({
  selector: 'app-student-attendance-dialog',
  templateUrl: './student-attendance-dialog.component.html',
  styleUrls: ['./student-attendance-dialog.component.css']
})

@Component({
  selector: 'my-qr-code-component',
  template: `
    <div>
      <qr-code [value]="" [size]="150"></qr-code>
    </div>
  `
})

export class StudentAttendanceDialogComponent implements OnInit {

  @Input() code;
  @Input() courseId;
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  modalParams = [
    {
      dismissible: false
    }
  ]

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
  });
  }

  openDialog(){
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  closeAttendance() {
    this.closeDialog();
  }
  
}
