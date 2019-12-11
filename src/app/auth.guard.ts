import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  
  constructor(private cookieService : CookieService,
    private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(JSON.parse(this.cookieService.get("userData"))){
      return true;
    }else{
      this.myRoute.navigateByUrl('/default.aspx/login-register');
      return false;
    }
  }
}
