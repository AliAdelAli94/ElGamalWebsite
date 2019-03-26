import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { ParentCategoryDto } from '../models/ParentCategoryDto.model';
import { ProductOfferDTO } from '../models/ProductOfferDTO.model';

@Injectable({
  providedIn: 'root'
})
export class DbManipulationService {

  constructor(private httpClient: HttpClient) { }

  getparentCategories(): Observable<ParentCategoryDto[]> {
    return this.httpClient.get<ParentCategoryDto[]>(AppSettings.webApiUrl + "category/GetParentCategories");
  }
  getProductOfferDTO(): Observable<ProductOfferDTO[]> {
    return this.httpClient.get<ProductOfferDTO[]>(AppSettings.webApiUrl + "Product/GetAllOffers");
  }

}

