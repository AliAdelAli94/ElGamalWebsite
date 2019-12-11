import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../models/LoginDTO.model';
import { RegisterDTO } from '../models/RegisterDTO.model';
import { DbManipulationService } from '../services/db-manipulation.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { SharingDataService } from '../services/sharing-data.service';
import { SpinnerServieService } from '../services/spinner-servie.service';


declare function IntializeWebsiteJS(): any;


@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent implements AfterViewInit {

  constructor(private dbManipulationService: DbManipulationService, 
    private router: Router,private sharingDataService : SharingDataService,private spinnerServieService : SpinnerServieService) { }

  @ViewChild('registerForm') public registerForm: NgForm;
  @ViewChild('loginForm') public loginForm: NgForm;

  loginDto: LoginDTO = new LoginDTO();
  regsiterDto: RegisterDTO = new RegisterDTO();
  saveForm: boolean = false;
  passwordNotMatchFlag: boolean = false;
  accountedCreatedFlag: boolean = false;
  accountAlreadyExistFlag: boolean = false;
  saveFormLogin: boolean = false;
  incorrectUsernameOrPasswordFlag: boolean = false;

  ngAfterViewInit() {

    IntializeWebsiteJS();
  }

  checkPasswords() {
    if (this.regsiterDto.confirmPassword == this.regsiterDto.password) {
      this.passwordNotMatchFlag = false;
    }
    else {
      this.passwordNotMatchFlag = true;
    }
  }

  addUser() {

    this.saveForm = true;
    if (this.regsiterDto && this.registerForm.valid == true) {
      this.regsiterDto.role = "user";
      this.dbManipulationService.registerUser(this.regsiterDto).subscribe((response) => {
        if (response == 0) {

          this.accountedCreatedFlag = true;
          this.saveForm = false;
          this.registerForm.reset();
        }

        if (response == 1) {
          this.accountedCreatedFlag = false;
          this.accountAlreadyExistFlag = true;
          this.saveForm = false;

        };
      })
    }
  }

  login() {
    this.loginDto.role = "user";
    this.saveFormLogin = true;

    this.spinnerServieService.showSpinner();
    if (this.loginDto && this.loginForm.valid == true) {
      this.dbManipulationService.login(this.loginDto).subscribe(response => {

        if (response == null) {
          this.incorrectUsernameOrPasswordFlag = true;
        }
        else {
          this.incorrectUsernameOrPasswordFlag = false;
          this.sharingDataService.setLoggedUserData(response);
          this.router.navigateByUrl('/default.aspx/home');
        }
      },()=>{ },()=>{
       this.spinnerServieService.hideSpinner();
      });
    }
  }

}
