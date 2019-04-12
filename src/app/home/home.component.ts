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
<<<<<<< HEAD
      this.offers = response;
=======
    this.offers = response;
>>>>>>> d220203d01b80bb4d3169f83556d51507c5ef4ee

      setTimeout(() => 
      {
        OfferSliderJS();
      }, 100);

<<<<<<< HEAD
    });
    
  }
  ngAfterViewInit() {
=======
    }); 
  }
  ngAfterViewInit() 
  {
>>>>>>> d220203d01b80bb4d3169f83556d51507c5ef4ee
    IntializeWebsiteJS();
  }
}