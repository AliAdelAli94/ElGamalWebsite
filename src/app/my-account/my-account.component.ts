import { Component, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    IntializeWebsiteJS();

  }

}
