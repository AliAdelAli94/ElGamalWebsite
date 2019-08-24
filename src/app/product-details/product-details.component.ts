import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbManipulationService } from '../services/db-manipulation.service';
import { GetProductById } from '../models/GetProductById.model';
import { CommentDTO } from '../models/CommentDTO.model';
import { CookieService } from 'ngx-cookie';
import { NgForm } from '@angular/forms';
import { SpinnerServieService } from '../services/spinner-servie.service';
import { SharingDataService } from '../services/sharing-data.service';
import { CardDTO } from '../models/CardDTO.model';
import { ProductDTO } from '../models/ProductDTO.model';
import { parse } from 'path';


declare function IntializeWebsiteJS(): any;
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit {
  product: GetProductById = new GetProductById();
  public CommentDto: CommentDTO = new CommentDTO();
  public saveForm: boolean = false;
  public userLoggedIn: boolean = false;

  @ViewChild('AddCommentForm') public AddCommentForm: NgForm;


  constructor(private dbManipulationService: DbManipulationService,
    private _activatedRoute: ActivatedRoute, private cookieService: CookieService,
    private spinnerServieService: SpinnerServieService, private router: Router, private sharingDataService: SharingDataService) { }

  ngOnInit() {
    let userData = JSON.parse(this.cookieService.get("userData"));
    if (userData) {
      this.userLoggedIn = true;
      this.CommentDto.userID = userData.ID;
      this.CommentDto.userName = userData.userName;
      this.CommentDto.productID = this._activatedRoute.snapshot.params['code'];
    } else {
      this.userLoggedIn = false;
    }

    this.getproductbyid();
  }
  getproductbyid() {
    let empcode: string = this._activatedRoute.snapshot.params['code'];
    this.dbManipulationService.getGetProductById(empcode).subscribe(response => {
      this.product = response;

      setTimeout(() => {
        IntializeWebsiteJS();
      }, 100);

    });
  }
  ngAfterViewInit() {
  }

  AddComment() {

    this.saveForm = true;
    if (this.AddCommentForm.valid == true) {
      this.CommentDto.ratingValue = document.getElementsByClassName("active starsRate").length.toString();
      this.spinnerServieService.showSpinner();
      this.dbManipulationService.AddComment(this.CommentDto).subscribe(response => {
        if (response == 0) {
          this.product.Comments.push(JSON.parse(JSON.stringify(this.CommentDto)));
          $('#confirmAddCommentModal').modal('show');
          this.AddCommentForm.reset();
        }
      }, () => { }, () => {
        this.spinnerServieService.hideSpinner();
      });
    }

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
      
      let selectedProduct: ProductDTO = new ProductDTO();
      selectedProduct.ID = this.product.ID;
      selectedProduct.ProductOptions = this.product.ProductOptions;
      selectedProduct.categoryID = this.product.categoryID;
      selectedProduct.NumberOfItems = 1;
      selectedProduct.description = this.product.description;
      selectedProduct.discountPercentage = this.product.discountPercentage;
      selectedProduct.images = this.product.images;
      selectedProduct.name = this.product.name;
      selectedProduct.parentCategoryName = this.product.parentCategoryName;
      selectedProduct.priceAfter = parseFloat(this.product.priceAfter);
      selectedProduct.priceBefore = parseFloat(this.product.priceBefore);
      selectedProduct.rate = this.product.rate;

      cardData.selectedProducts.push(selectedProduct);

    }

    cardData.productsPrice = 0;
    cardData.selectedProducts.forEach(x => {
      cardData.productsPrice = cardData.productsPrice + (x.priceAfter * x.NumberOfItems);
    });

    cardData.shipingPrice = 0.0;
    cardData.totalPrice = cardData.shipingPrice + cardData.productsPrice;

    this.sharingDataService.setCardData(cardData);

    $('#confirmAddNewItemModal').modal('show');


  }

}
