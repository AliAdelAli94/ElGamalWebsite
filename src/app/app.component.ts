import { Component,AfterViewInit } from '@angular/core';

declare function IntializeFirstTimeOnly() :any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor() {

  }
  title = 'MyFirstAngularApp';

  ngAfterViewInit(){

    IntializeFirstTimeOnly();
  }

}