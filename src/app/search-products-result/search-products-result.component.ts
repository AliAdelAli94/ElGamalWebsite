import { Component, AfterViewInit } from '@angular/core';


declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-search-products-result',
  templateUrl: './search-products-result.component.html',
  styleUrls: ['./search-products-result.component.css']
})
export class SearchProductsResultComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    IntializeWebsiteJS();

  }

}
