import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SearchProductsResultComponent } from './search-products-result/search-products-result.component'
import { DbManipulationService } from './services/db-manipulation.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductDetailsComponent,
    CartComponent,
    LoginAndRegisterComponent,
    CheckoutComponent,
    MyAccountComponent,
    OrderDetailsComponent,
    SearchProductsResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DbManipulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
