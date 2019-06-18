import { Component, AfterViewInit } from '@angular/core';
import { CardDTO } from '../models/CardDTO.model';
import { SharingDataService } from '../services/sharing-data.service';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cardData : CardDTO = new CardDTO();
  constructor(private sharingDataService : SharingDataService) {
    this.getCardData();
  }


  ngAfterViewInit() {
    IntializeWebsiteJS();
  }

  getCardData() {
    this.sharingDataService.cardData.subscribe(response => {
      this.cardData = response;
    });
  };


}
