import { Component, AfterViewInit } from '@angular/core';
import { CardDTO } from '../models/CardDTO.model';
import { SharingDataService } from '../services/sharing-data.service';

declare function IntializeWebsiteJS(): any;
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cardData: CardDTO = new CardDTO();
  constructor(private sharingDataService: SharingDataService) {
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

  deleteCartItem(productId: string) {

    this.cardData.productsPrice = 0;
    let productIndex = this.cardData.selectedProducts.findIndex(x => x.ID == productId);
    if (productIndex != -1) {
      this.cardData.selectedProducts.splice(productIndex, 1);
    }
    this.cardData.selectedProducts.forEach(x => {
      this.cardData.productsPrice = this.cardData.productsPrice + (x.priceAfter * x.NumberOfItems);
    });

    this.cardData.shipingPrice = 0.0;
    this.cardData.totalPrice = this.cardData.shipingPrice + this.cardData.productsPrice;

    this.sharingDataService.setCardData(this.cardData);
    $('#confirmDeleteItemModal').modal('show');
  };

  addCartItem(productId: string, change: number) {

    this.cardData.productsPrice = 0;
    let productIndex = this.cardData.selectedProducts.findIndex(x => x.ID == productId);
    if (productIndex != -1) {
      let item = this.cardData.selectedProducts[productIndex];
      item.NumberOfItems = item.NumberOfItems + change;
      if(item.NumberOfItems == 0){
        this.deleteCartItem(item.ID);
        return null;
      }
    }
    this.cardData.selectedProducts.forEach(x => {
      this.cardData.productsPrice = this.cardData.productsPrice + (x.priceAfter * x.NumberOfItems);
    });

    this.cardData.shipingPrice = 0.0;
    this.cardData.totalPrice = this.cardData.shipingPrice + this.cardData.productsPrice;

    this.sharingDataService.setCardData(this.cardData);
    $('#confirmEditItemModal').modal('show');
  };

}
