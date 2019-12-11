import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SharingDataService } from '../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerServieService } from '../services/spinner-servie.service';
import { DbManipulationService } from '../services/db-manipulation.service';
import { GetOrderDTO } from '../models/GetOrderDTO.model';
import { OrderDetailsDTO } from '../models/OrderDetailsDTO.model';

declare function IntializeWebsiteJS(): any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit,AfterViewInit {

  orderDetails : OrderDetailsDTO;

  constructor(private dbManipulationService: DbManipulationService,
    public sharingDataService: SharingDataService, private spinnerService: SpinnerServieService,
    private _activatedRoute: ActivatedRoute,private router : Router){

      this.orderDetails = new OrderDetailsDTO();

  }

  ngOnInit(){

    let OrderID = this._activatedRoute.snapshot.params['id'];
    this.getOrderDetails(OrderID);

  }
  
  ngAfterViewInit() {
    IntializeWebsiteJS();
  }

  getOrderDetails (id : string){

    this.spinnerService.showSpinner();
      this.dbManipulationService.GetOrderDetailsByID(id).subscribe(response => {
        if (response != null) {
          this.orderDetails = response;
        }
      }, () => { }, () => {
        this.spinnerService.hideSpinner();
      });
    }

    navigateToOrderDetailsPage(id: string) {

      this.router.navigateByUrl('/default.aspx/RefrshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/default.aspx/product-details', id]));
    };
}


