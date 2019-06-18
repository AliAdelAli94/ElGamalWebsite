import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO.model';
import { CookieService } from 'ngx-cookie';
import { Observable, observable, of, BehaviorSubject, Subject } from 'rxjs';
import { ProductFilterDTO } from '../models/ProductFilterDTO.model';
import { CardDTO } from '../models/CardDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  public userData : BehaviorSubject<UserDTO>;
  public filterDTO = new ProductFilterDTO();
  public cardData : BehaviorSubject<CardDTO>;
  

  constructor(private cookieService: CookieService) {
    if(this.cookieService.get("userData") == undefined){
      this.cookieService.put("userData",JSON.stringify(null)); 
    }
    this.userData = new BehaviorSubject(JSON.parse(this.cookieService.get("userData")));

    if(window.localStorage.getItem("cardData") == undefined  || window.localStorage.getItem("cardData") == "null"){
      window.localStorage.setItem("cardData",JSON.stringify(new CardDTO())); 
    }
    this.cardData = new BehaviorSubject(JSON.parse(window.localStorage.getItem("cardData")));

  }

  setLoggedUserData(data: any) {
    this.cookieService.put("userData", JSON.stringify(data));
    this.userData.next(JSON.parse(this.cookieService.get("userData")));
  }

  setCardData(data: any) {
    window.localStorage.setItem("cardData", JSON.stringify(data));
    this.cardData.next(JSON.parse(window.localStorage.getItem("cardData")));
  }

  getCardData() {
    return window.localStorage.getItem("cardData");
  }

  getLoggedUserData() {
    return this.cookieService.get("userData");
  }

}
