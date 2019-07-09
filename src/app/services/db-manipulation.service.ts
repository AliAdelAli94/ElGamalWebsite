import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { ParentCategoryDto } from '../models/ParentCategoryDto.model';
import { GetProductById } from '../models/GetProductById.model';
import { LoginDTO } from '../models/LoginDTO.model';
import { RegisterDTO } from '../models/RegisterDTO.model';
import { ProductFilterDTO } from '../models/ProductFilterDTO.model';
import { FilteredProductsDTO } from '../models/FilteredProductsDTO.model';
import { OrderDTO } from '../models/OrderDTO.model';
import { ProductDTO } from '../models/ProductDTO.model';
import { CommentDTO } from '../models/CommentDTO.model';

@Injectable({
  providedIn: 'root'
})
export class DbManipulationService {

  constructor(private httpClient: HttpClient) { }

  getparentCategories(): Observable<ParentCategoryDto[]> {
    return this.httpClient.get<ParentCategoryDto[]>(AppSettings.webApiUrl + "category/GetParentCategories");
  }
  getProductOfferDTO(): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>(AppSettings.webApiUrl + "Product/GetAllOffers");
  }
  getGetProductById(item: string): Observable<GetProductById> {
    return this.httpClient.get<GetProductById>(AppSettings.webApiUrl + "Product/GetProductById/" + item);
  }

  login(item: LoginDTO): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "User/Login/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  GetFilteredProducts(item: ProductFilterDTO): Observable<FilteredProductsDTO> {

    return this.httpClient.post<FilteredProductsDTO>(AppSettings.webApiUrl + "Product/GetFilteredProducts", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  registerUser(item: RegisterDTO): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "User/RegisterUser/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  
  makeOrder(item: OrderDTO): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Order/MakeOrder", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  AddComment(item: CommentDTO): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Product/AddComment", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

