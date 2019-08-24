import { Component, OnInit } from '@angular/core';
import { ParentCategoryDto } from '../models/ParentCategoryDto.model';
import { DbManipulationService } from '../services/db-manipulation.service';
import { SharingDataService } from '../services/sharing-data.service';
import { UserDTO } from '../models/UserDTO.model';
import { Router } from '@angular/router';
import { CardDTO } from '../models/CardDTO.model';
import { SpinnerServieService } from '../services/spinner-servie.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: ParentCategoryDto[];
  loggedInFlag: boolean = false;
  CardHasDataFlag: boolean = false;
  userDto: UserDTO = new UserDTO();
  cardData: CardDTO = new CardDTO();

  constructor(private dbManipulationService: DbManipulationService,
    public sharingDataService: SharingDataService, public router: Router, private spinnerService: SpinnerServieService) { }

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
        else {
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
    }, () => { }, () => {
      this.spinnerService.hideSpinner();
    });
  };

  navigateToCompleteOrder() {
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/checkout']));
  };

  navigateToSearchProductsPage(id: string) {

    this.sharingDataService.filterDTO.CategoriesIDs = null;
    this.sharingDataService.filterDTO.NamePart = null;
    this.sharingDataService.filterDTO.PageNumber = 1;
    this.sharingDataService.filterDTO.PriceFrom = null;
    this.sharingDataService.filterDTO.PriceTO = null;
    this.sharingDataService.filterDTO.SortingType = null;

    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/search-result', id]));
  };

  navigateToCartPage() {
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/cart']));


    $('.header-carticon').removeClass('is-active');
    $('.header-minicart').slideToggle();


  };

  logout() {
    this.sharingDataService.setLoggedUserData(null);
    this.sharingDataService.setCardData(new CardDTO());
    this.loggedInFlag = false;
  };

  search() {

    this.sharingDataService.filterDTO.CategoriesIDs = null;
    this.sharingDataService.filterDTO.CategoryID = null;
    this.sharingDataService.filterDTO.PageNumber = 1;
    this.sharingDataService.filterDTO.PriceFrom = null;
    this.sharingDataService.filterDTO.PriceTO = null;
    this.sharingDataService.filterDTO.SortingType = null;

    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/search-result']));
  };

}
