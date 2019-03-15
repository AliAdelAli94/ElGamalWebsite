import { Component, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    IntializeWebsiteJS();

  }

}
