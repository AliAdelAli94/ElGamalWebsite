import { Component, AfterContentInit, AfterViewInit } from '@angular/core';
import { DbManipulationService } from '../services/db-manipulation.service';
import { ProductDTO } from '../models/ProductDTO.model';
import { SpinnerServieService } from '../services/spinner-servie.service';
import { SharingDataService } from '../services/sharing-data.service';
import { CardDTO } from '../models/CardDTO.model';

declare function IntializeWebsiteJS(): any;
declare function OfferSliderJS(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  offers: ProductDTO[];
  constructor(private dbManipulationService: DbManipulationService,
    private spinnerService : SpinnerServieService,private sharingDataService : SharingDataService) { }

  ngOnInit() {
    this.getProductOfferDTO();  
  }
  getProductOfferDTO() 
  {
    this.spinnerService.showSpinner();
    this.dbManipulationService.getProductOfferDTO().subscribe(response => {
    this.offers = response;

      setTimeout(() => 
      {
        OfferSliderJS();
      }, 100);

    },()=>{},()=>{
    this.spinnerService.hideSpinner();
    }); 
  }
  ngAfterViewInit() 
  {
    setTimeout(() => 
      {
        IntializeWebsiteJS();
      }, 100);
  }

  
  AddToCart(productID: string) {
    let cardData: CardDTO = new CardDTO();
    cardData = JSON.parse(this.sharingDataService.getCardData());

    let existedProduct: ProductDTO[] = new Array();
    existedProduct = cardData.selectedProducts.filter(x => x.ID == productID);
    if (existedProduct.length > 0) {
      existedProduct[0].NumberOfItems = existedProduct[0].NumberOfItems + 1;
    }
    else {
      let selectedProduct: ProductDTO = JSON.parse(JSON.stringify(this.offers.filter(x => x.ID == productID)[0]));
      if (selectedProduct) {
        selectedProduct.NumberOfItems = 1;
        cardData.selectedProducts.push(selectedProduct);
      }
    }

    cardData.productsPrice = 0;
    cardData.selectedProducts.forEach(x => {
      cardData.productsPrice = cardData.productsPrice + (x.priceAfter * x.NumberOfItems);
    });

    cardData.shipingPrice = 0.0;
    cardData.totalPrice = cardData.shipingPrice + cardData.productsPrice;

    this.sharingDataService.setCardData(cardData);

  }

}