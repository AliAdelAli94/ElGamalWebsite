import { Component, OnInit, AfterViewInit } from '@angular/core';


declare var $ :any;


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit , AfterViewInit{

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    
    /* Herobanner Slider */
    
		$('.herobanner').slick({
			slidesToShow: 1,
			autoplay: false,
			autoplaySpeed: 8000,
			speed: 1000,
			adaptiveHeight: true,
			fade: true,
			easing: 'ease-in-out',
			dots: true,
			arrows: true,
			prevArrow: '<span class="slider-navigation-arrow slider-navigation-prev"><i class="ion ion-ios-arrow-forward"></i></span>',
			nextArrow: '<span class="slider-navigation-arrow slider-navigation-next"><i class="ion ion-ios-arrow-back"></i></span>',
			rtl: true,
		});
  }
}
