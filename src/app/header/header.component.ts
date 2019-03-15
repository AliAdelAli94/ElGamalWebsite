import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { DbManipulationService } from '../services/db-manipulation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[];

  constructor( private dbManipulationService : DbManipulationService) { }

  ngOnInit() {

    this.getAllCategories();

  }

  getAllCategories(){

    this.dbManipulationService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

}
