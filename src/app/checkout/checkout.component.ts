import { Component, AfterViewInit } from '@angular/core';
import { SharingDataService } from '../services/sharing-data.service';
import { CardDTO } from '../models/CardDTO.model';
import { OrderDTO } from '../models/OrderDTO.model';
import { DbManipulationService } from '../services/db-manipulation.service';
import { CookieService } from 'ngx-cookie';
import { UserDTO } from '../models/UserDTO.model';
import { MakeOrderResultDTO } from '../models/MakeOrderResultDTO.model';
import { Router } from '@angular/router';
import { SpinnerServieService } from '../services/spinner-servie.service';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewInit {

  orderData : OrderDTO = new OrderDTO();
  saveFormCheckout : boolean = false;
  
  constructor(private sharingDataService : SharingDataService, 
    private dbManipulationService : DbManipulationService, private cookieService : CookieService,
    private router : Router,private spinnerService : SpinnerServieService) {
    this.getCurrentOrderData();
   }

  ngAfterViewInit() {
    IntializeWebsiteJS();
  }

  getCurrentOrderData(){
    this.orderData.cartData = JSON.parse(this.sharingDataService.getCardData());
  }

  makeOrder(){
    let currentUser : UserDTO = JSON.parse(this.cookieService.get("userData"));
    if(currentUser){
      this.spinnerService.showSpinner();
      this.orderData.userID = currentUser.ID;
      this.dbManipulationService.makeOrder(this.orderData).subscribe(response => {
        let result : MakeOrderResultDTO  = response;
        if(result.StatusCode == 0){
          this.router.navigateByUrl('/confirm-order');
        }
      },()=>{},()=>{
        this.spinnerService.hideSpinner();
      });
    }
  }

}
