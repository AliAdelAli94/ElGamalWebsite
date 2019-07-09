import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbManipulationService } from '../services/db-manipulation.service';
import { GetProductById } from '../models/GetProductById.model';
import { CommentDTO } from '../models/CommentDTO.model';
import { CookieService } from 'ngx-cookie';
import { NgForm } from '@angular/forms';
import { SpinnerServieService } from '../services/spinner-servie.service';


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
    private _activatedRoute: ActivatedRoute, private cookieService: CookieService, private spinnerServieService: SpinnerServieService,private router : Router) { }

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

}
