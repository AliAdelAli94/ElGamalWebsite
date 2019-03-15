import { Component, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor() {

  }


  ngAfterViewInit() {

IntializeWebsiteJS();

  }

  
}
