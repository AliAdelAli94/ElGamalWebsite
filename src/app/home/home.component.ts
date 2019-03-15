import { Component,AfterContentInit, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {

    IntializeWebsiteJS();
  }



}
