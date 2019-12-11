import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbManipulationService } from '../services/db-manipulation.service';
import { CommentDTO } from '../models/CommentDTO.model';
import { CookieService } from 'ngx-cookie';
import { NgForm } from '@angular/forms';
import { SpinnerServieService } from '../services/spinner-servie.service';
import { SharingDataService } from '../services/sharing-data.service';
import { CardDTO } from '../models/CardDTO.model';
import { ProductDTO } from '../models/ProductDTO.model';
import { ProductDetailsDTO } from '../models/ProductDetailsDTO.model';
import { Meta } from '@angular/platform-browser';


declare function IntializeWebsiteJS(): any;
declare function OfferSliderJS(): any;
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit {
  item: ProductDetailsDTO = new ProductDetailsDTO();
  public CommentDto: CommentDTO = new CommentDTO();
  public saveForm: boolean = false;
  public userLoggedIn: boolean = false;

  @ViewChild('AddCommentForm') public AddCommentForm: NgForm;


  constructor(private dbManipulationService: DbManipulationService,
    private _activatedRoute: ActivatedRoute, private cookieService: CookieService,
    private spinnerServieService: SpinnerServieService, private router: Router,
     private sharingDataService: SharingDataService,private meta : Meta) { }

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

    let empcode: string = this._activatedRoute.snapshot.params['code'];
    this.getproductbyid(empcode);
  }
  getproductbyid(id : string) {
    this.dbManipulationService.getGetProductById(id).subscribe(response => {
      this.item = response;

      setTimeout(() => {
        IntializeWebsiteJS();
        OfferSliderJS();
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
          this.item.CurrentProduct.Comments.push(JSON.parse(JSON.stringify(this.CommentDto)));
          $('#confirmAddCommentModal').modal('show');
          this.AddCommentForm.reset();
        }
      }, () => { }, () => {
        this.spinnerServieService.hideSpinner();
      });
    }

  }

  
  navigateToProductDetails(id:string) {
    this.router.navigateByUrl('/default.aspx/RefrshComponent', { skipLocationChange: false }).then(() =>
      this.router.navigate(['/default.aspx/product-details',id]));
  };


  AddToCart(productID: string) {
    let cardData: CardDTO = new CardDTO();
    cardData = JSON.parse(this.sharingDataService.getCardData());

    let existedProduct: ProductDTO[] = new Array();
    existedProduct = cardData.selectedProducts.filter(x => x.ID == productID);
    if (existedProduct.length > 0) {
      existedProduct[0].NumberOfItems = existedProduct[0].NumberOfItems + 1;
    }
    else {
      this.item.CurrentProduct.NumberOfItems = 1;
      cardData.selectedProducts.push(this.item.CurrentProduct);
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
