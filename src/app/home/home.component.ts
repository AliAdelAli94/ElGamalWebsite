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
  getProductOfferDTO() {

    this.dbManipulationService.getProductOfferDTO().subscribe(response => {
<<<<<<< HEAD
      this.offers = response;  
=======
      this.offers = response;

      setTimeout(() => {
        OfferSliderJS();
      }, 100);

>>>>>>> 826e5c28bb93904e335d23024eb4c8df28842354
    });
    
  }
<<<<<<< HEAD
  ngAfterViewInit() 
  { 
=======
  ngAfterViewInit() {
>>>>>>> 826e5c28bb93904e335d23024eb4c8df28842354
    IntializeWebsiteJS();
  }

}
