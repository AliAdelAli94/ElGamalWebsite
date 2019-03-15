import { Component, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;


@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    IntializeWebsiteJS();
  }

}
