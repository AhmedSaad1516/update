/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class homeGuard implements CanActivate  {
  constructor(private router :Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if('token' in localStorage ){

            return true
      }else{

        this.router.navigateByUrl('/auth/login')
        return false
      }
        }
};
