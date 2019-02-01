import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courseData: Object;

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService, private actr: ActivatedRoute) {
      this.actr.data.map(data => data.cres.json()).subscribe(res => {
        console.log(res);
        this.courseData = res;
      });
    }

  ngOnInit() {
    console.log("Componet Initiated")
  }

}
