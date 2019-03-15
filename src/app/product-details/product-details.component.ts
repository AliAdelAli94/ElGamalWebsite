import { Component, AfterViewInit } from '@angular/core';

declare function IntializeWebsiteJS(): any;


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    IntializeWebsiteJS();

  }

}
