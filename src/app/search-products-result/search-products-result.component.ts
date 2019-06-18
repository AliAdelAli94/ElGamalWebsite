import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SharingDataService } from '../services/sharing-data.service';
import { FilteredProductsDTO } from '../models/FilteredProductsDTO.model';
import { DbManipulationService } from '../services/db-manipulation.service';
import { CardDTO } from '../models/CardDTO.model';
import { ProductDTO } from '../models/ProductDTO.model';
import { ImageDTO } from '../models/ImageDTO.model';
import { SpinnerServieService } from '../services/spinner-servie.service';


declare function IntializeWebsiteJS(): any;
declare function IntializeRangeSlider(): any;

@Component({
  selector: 'app-search-products-result',
  templateUrl: './search-products-result.component.html',
  styleUrls: ['./search-products-result.component.css']
})
export class SearchProductsResultComponent implements AfterViewInit, OnInit {

  filteredData: FilteredProductsDTO = new FilteredProductsDTO();

  constructor(private dbManipulationService: DbManipulationService, 
    public sharingDataService: SharingDataService,private spinnerService : SpinnerServieService) { }

  ngAfterViewInit() {
    IntializeWebsiteJS();
  }

  ngOnInit() {
    this.getFilteredProducts();
  }

  search() {
    this.sharingDataService.filterDTO.CategoriesIDs = this.filteredData.Brands.filter(x => x.checked == true).map(x => x.ID);

    this.sharingDataService.filterDTO.PriceTO = document.getElementsByClassName("range-slider-rightlabel")[0].textContent;
    this.sharingDataService.filterDTO.PriceFrom = document.getElementsByClassName("range-slider-leftlabel")[0].textContent;

    this.getFilteredProducts();
  }

  getFilteredProducts() {
    
    this.spinnerService.showSpinner();
    this.dbManipulationService.GetFilteredProducts(this.sharingDataService.filterDTO).subscribe(response => {
      this.filteredData = response;
      this.filteredData.Products.forEach(x => {
        if (x.rate == null) {
          x.rateArray = new Array();
        }
        else {
          x.rateArray = new Array(x.rate);
        }
      });

      this.sharingDataService.filterDTO.PageNumber = (this.sharingDataService.filterDTO.PageNumber == null || this.sharingDataService.filterDTO.PageNumber == 0) ? 1 : this.sharingDataService.filterDTO.PageNumber;
      this.filteredData.NumerOfPagesArray = Array(this.filteredData.NumerOfPages).fill(0).map((x, i) => i + 1);
      let sliderHtml = document.getElementsByClassName("range-slider")[0];
      sliderHtml.setAttribute("data-cur_max", this.filteredData.MaxPriceValue);
      sliderHtml.setAttribute("data-range_max", this.filteredData.MaxPriceValue);

      IntializeRangeSlider();
    },()=>{},()=>{
      this.spinnerService.hideSpinner();
    });
  }

  changeSortingType(event: any, val: number) {

    this.sharingDataService.filterDTO.SortingType = val;
    document.getElementsByClassName("select-sortby-current")[0].innerHTML = event.currentTarget.innerHTML;

    (document.querySelector('.select-sortby-list') as HTMLElement).style.display = 'none';

  }

  changePageNumber(PageNumber: number) {

    this.sharingDataService.filterDTO.PageNumber = PageNumber;
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
      let selectedProduct: ProductDTO = JSON.parse(JSON.stringify(this.filteredData.Products.filter(x => x.ID == productID)[0]));
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
