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
import { AuthGuard } from './auth.guard';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowWeAreComponent } from './how-we-are/how-we-are.component';

const routes: Routes = [
  {path: 'default.aspx', component: HomeComponent },
  {path: 'default.aspx/home', component: HomeComponent },
  {path: '', redirectTo: 'default.aspx/home', pathMatch: 'full' },
  {path: 'default.aspx/product-details/:code', component: ProductDetailsComponent },
  {path: 'default.aspx/cart',component:CartComponent},
  {path: 'default.aspx/login-register',component:LoginAndRegisterComponent},
  {path: 'default.aspx/checkout',component:CheckoutComponent,canActivate: [AuthGuard]},
  {path: 'default.aspx/my-account/:tabID',component:MyAccountComponent},
  {path: 'default.aspx/order-details/:id',component:OrderDetailsComponent},
  {path: 'default.aspx/search-result',component:SearchProductsResultComponent},
  {path: 'default.aspx/search-result/:categoryID',component:SearchProductsResultComponent},
  {path: 'default.aspx/confirm-order',component:ConfirmOrderComponent},
  {path: 'default.aspx/About-Us',component:AboutUsComponent},
  {path: 'default.aspx/How-We-Are',component:HowWeAreComponent},
  {path: '**',component:notfound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
