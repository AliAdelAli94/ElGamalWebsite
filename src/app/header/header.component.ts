import { Component, OnInit } from '@angular/core';
import { ParentCategoryDto } from '../models/ParentCategoryDto.model';
import { DbManipulationService } from '../services/db-manipulation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: ParentCategoryDto[];

  constructor( private dbManipulationService : DbManipulationService) { }

  ngOnInit() {

    this.getparentCategories();

  }

  getparentCategories(){

    this.dbManipulationService.getparentCategories().subscribe(response => {
      this.categories = response;
    });
  }
}
