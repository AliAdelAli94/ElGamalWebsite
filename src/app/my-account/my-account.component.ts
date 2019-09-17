import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DbManipulationService } from '../services/db-manipulation.service';
import { SharingDataService } from '../services/sharing-data.service';
import { SpinnerServieService } from '../services/spinner-servie.service';
import { UserDTO } from '../models/UserDTO.model';
import { NgForm } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOrderDTO } from '../models/GetOrderDTO.model';
import { Route } from '@angular/compiler/src/core';
import { ProductDTO } from '../models/ProductDTO.model';

declare function IntializeWebsiteJS(): any;
declare var $: any;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements AfterViewInit, OnInit {

  constructor(private dbManipulationService: DbManipulationService,
    public sharingDataService: SharingDataService, private spinnerService: SpinnerServieService,
    private _activatedRoute: ActivatedRoute,private router : Router){
      this.myOrders = new Array();
      this.myFavourites = new Array();

  }

  saveForm: boolean;
  userData: UserDTO;
  message: string;
  tabID: number;
  myOrders: GetOrderDTO[];
  myFavourites : ProductDTO[];

  @ViewChild('accountEditForm') public accountEditForm: NgForm;


  ngOnInit() {
    this.tabID = this._activatedRoute.snapshot.params['tabID'];
    this.getLoggedInUser();
    this.getMyOrders();
    this.getMyFavourites();
  }

  ngAfterViewInit() {

    IntializeWebsiteJS();

  }

  getLoggedInUser() {
    this.sharingDataService.userData.subscribe(response => {
      this.userData = JSON.parse(JSON.stringify(response));
      if (!(this.userData)) {
        this.userData = new UserDTO();
      }
    });
  };

  editUser() {
    this.saveForm = true;

    this.spinnerService.showSpinner();
    if (this.userData && this.accountEditForm.valid == true) {
      this.dbManipulationService.EditUser(this.userData).subscribe(response => {

        if (response == 0) {
          this.message = "لقد تم تعديل بياناتك"
          $('#editUserModal').modal('show');

          this.sharingDataService.setLoggedUserData(this.userData);
        }
        if (response == -1) {
          this.message = "لقد حدث خطأ أثناء التعديل"
          $('#editUserModal').modal('show');
        }
        if (response == 2) {
          this.message = "هذا الإيميل مسجل لشخص أخر"
          $('#editUserModal').modal('show');
        }
      }, () => { }, () => {
        this.spinnerService.hideSpinner();
      });
    }
  }


  getMyOrders() {

    this.spinnerService.showSpinner();
    if (this.userData) {
      this.dbManipulationService.GetOrdersToUser(this.userData.ID).subscribe(response => {
        if (response != null) {
          this.myOrders = response;
        }
      }, () => { }, () => {
        this.spinnerService.hideSpinner();
      });
    }
  }

  navigateToOrderDetails(orderID: string) {
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/order-details',orderID]));
  }


  getMyFavourites() {

    this.spinnerService.showSpinner();
    if (this.userData) {
      this.dbManipulationService.GetAllFavourites(this.userData.ID).subscribe(response => {
        if (response != null) {
          this.myFavourites  = response;
        }
      }, () => { }, () => {
        this.spinnerService.hideSpinner();
      });
    }
  }

  navigateToProductDetailsPage(productID : string){
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/product-details',productID]));
  }


}
