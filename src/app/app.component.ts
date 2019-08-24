import { Component, AfterViewInit } from '@angular/core';

declare function IntializeFirstTimeOnly(): any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor() {

  }
  title = 'El Gamal Website';

  ngAfterViewInit() {

    IntializeFirstTimeOnly();
  }

  
}