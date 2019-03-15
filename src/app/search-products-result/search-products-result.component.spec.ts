import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductsResultComponent } from './search-products-result.component';

describe('SearchProductsResultComponent', () => {
  let component: SearchProductsResultComponent;
  let fixture: ComponentFixture<SearchProductsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
