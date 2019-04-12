import { Component, AfterContentInit, AfterViewInit } from '@angular/core';
import { ProductOfferDTO } from '../models/ProductOfferDTO.model';
import { DbManipulationService } from '../services/db-manipulation.service';

declare function IntializeWebsiteJS(): any;
declare function OfferSliderJS(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  offers: ProductOfferDTO[];
  constructor(private dbManipulationService: DbManipulationService) { }

  ngOnInit() {

    this.getProductOfferDTO();
    
  }
  getProductOfferDTO() 
  {
    this.dbManipulationService.getProductOfferDTO().subscribe(response => {
    this.offers = response;

      setTimeout(() => 
      {
        OfferSliderJS();
      }, 100);

    }); 
  }
  ngAfterViewInit() 
  {
    IntializeWebsiteJS();
  }
}