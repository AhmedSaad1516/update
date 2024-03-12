/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class loginGuard  implements CanActivate {
  constructor(private router :Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if('token' in localStorage ){
        this.router.navigateByUrl('/home')
            return false
      }else{

          return true
      }
        }
};
