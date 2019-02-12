import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import { NavbarService } from '../services/navbar.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;


  constructor(public authService:AuthService, private router:Router, public nav: NavbarService) { }

  ngOnInit(){}

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'Login'| 'Register'){
    this.authDialog.openDialog(mode);

  }

}