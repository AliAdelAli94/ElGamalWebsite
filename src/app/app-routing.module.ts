import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { logging } from 'protractor';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SearchProductsResultComponent } from './search-products-result/search-products-result.component';
import { notfound } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'product-details/:code', component: ProductDetailsComponent },
  {path:'cart',component:CartComponent},
  {path:'login-register',component:LoginAndRegisterComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-account',component:MyAccountComponent},
  {path:'order-details',component:OrderDetailsComponent},
  {path:'search-result',component:SearchProductsResultComponent},
  {path:'**',component:notfound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
