import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbManipulationService } from '../services/db-manipulation.service';
import { GetProductById } from '../models/GetProductById.model';


declare function IntializeWebsiteJS(): any;


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit {
  product: GetProductById[];
  constructor(private dbManipulationService: DbManipulationService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit()
  {
    this.getproductbyid();
  }
  getproductbyid()
  {
    let empcode: string=this._activatedRoute.snapshot.params['code'];
    this.dbManipulationService.getGetProductById(empcode).subscribe(response =>
    {
    this.product = response;
    });
  }
  ngAfterViewInit() 
  {
    IntializeWebsiteJS();
  }

}
