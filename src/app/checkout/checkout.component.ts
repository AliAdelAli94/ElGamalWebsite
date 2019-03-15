import { Component, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    IntializeWebsiteJS();
  }

}
