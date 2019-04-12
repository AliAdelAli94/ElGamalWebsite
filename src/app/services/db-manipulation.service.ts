import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { ParentCategoryDto } from '../models/ParentCategoryDto.model';
import { ProductOfferDTO } from '../models/ProductOfferDTO.model';
import { GetProductById } from '../models/GetProductById.model';

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
  getGetProductById(item: string): Observable<GetProductById[]> {
    return this.httpClient.get<GetProductById[]>(AppSettings.webApiUrl + "Product/GetProductById/" + item);
  }
}

