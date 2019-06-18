import { Component, OnInit } from '@angular/core';
import { ParentCategoryDto } from '../models/ParentCategoryDto.model';
import { DbManipulationService } from '../services/db-manipulation.service';
import { SharingDataService } from '../services/sharing-data.service';
import { UserDTO } from '../models/UserDTO.model';
import { Router } from '@angular/router';
import { CardDTO } from '../models/CardDTO.model';
import { SpinnerServieService } from '../services/spinner-servie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: ParentCategoryDto[];
  loggedInFlag: boolean = false;
  CardHasDataFlag : boolean = false;
  userDto: UserDTO = new UserDTO();
  cardData: CardDTO = new CardDTO();

  constructor(private dbManipulationService: DbManipulationService,
    public sharingDataService: SharingDataService, private router: Router,private spinnerService : SpinnerServieService) { }

  ngOnInit() {
    this.getparentCategories();
    this.getLoggedInUser();

    this.getCardData();
  }

  getCardData() {
    this.sharingDataService.cardData.subscribe(response => {
      this.cardData = response;
      if (this.cardData) {
        if (this.cardData.productsPrice > 0) {
          this.CardHasDataFlag = true;
        }
        else{
          this.CardHasDataFlag = false;
        }
      }
    });
  };

  getLoggedInUser() {
    this.sharingDataService.userData.subscribe(response => {
      this.userDto = response;
      if (this.userDto) {
        if (this.userDto.ID) {
          this.loggedInFlag = true;
        }
      }
    });
  };

  getparentCategories() {
    this.spinnerService.showSpinner();
    this.dbManipulationService.getparentCategories().subscribe(response => {
      this.categories = response;
    },()=>{},()=>{
      this.spinnerService.hideSpinner();
    });
  };

  logout() {
    this.sharingDataService.setLoggedUserData(null);
    this.sharingDataService.setCardData(new CardDTO());
    this.loggedInFlag = false;
  };

  search() {
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/search-result']));
  }

}
