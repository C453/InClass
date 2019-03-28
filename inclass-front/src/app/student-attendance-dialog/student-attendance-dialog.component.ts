import { Component, OnInit, EventEmitter, Input, ViewChild } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { ZXingScannerComponent } from '@zxing/ngx-scanner';


@Component({
  selector: 'app-student-attendance-dialog',
  templateUrl: './student-attendance-dialog.component.html',
  styleUrls: ['./student-attendance-dialog.component.css']
})

export class StudentAttendanceDialogComponent implements OnInit {

  @Input() code;
  @Input() courseId;
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  hasCameras = false;
    hasPermission: boolean;
    qrResultString: string;
    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;

  modalParams = [
    {
      dismissible: false
    }
  ]

  modalActions = new EventEmitter<string|MaterializeAction>();
  location;

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

  ngOnInit() {

  this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
    this.hasCameras = true;

    console.log('Devices: ', devices);
    this.availableDevices = devices;

    this.scanner.scan(devices[devices.length-1].deviceId);

    // selects the devices's back camera by default
    // for (const device of devices) {
    //     if (/back|rear|environment/gi.test(device.label)) {
    //         this.scanner.changeDevice(device);
    //         this.selectedDevice = device;
    //         break;
    //     }
    // }
});
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
  }
  
  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;

    this.authTokenService.post('take_attendance', {code: this.qrResultString, lat: this.location.latitude, long: this.location.longitude}).subscribe(res => {
      res = res.json();
      console.log(res);
      if((res.status as unknown) as string === 'success') {
        alert("Attendance taken!");
        this.closeDialog();
      } else if ((res.status as unknown) as string === 'not in class') {
        alert('Attendance failed! Not near class!')
      } else {
        alert("Attendance failed!");
      }
    });
  }
}
