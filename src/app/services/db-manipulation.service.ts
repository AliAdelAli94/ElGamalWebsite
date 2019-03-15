import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AppSettings } from '../AppSettings';

@Injectable({
  providedIn: 'root'
})
export class DbManipulationService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(AppSettings.webApiUrl + "category/getallcategories");
  }

}

