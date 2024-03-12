import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn, ActivatedRoute, mapToCanActivate
} from '@angular/router';
import {catchError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedStateService } from '../../shared/services/shared-state.service';
// import { LoginService } from '../services/login.service';
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const testV = 2;
  // const loginService = inject(LoginService);
  const sharedStateService = inject(SharedStateService)
  const router = inject(Router);           
  // return loginService.isLoggedIn().pipe(
  //   map(loggedIn => loggedIn ? true : router.createUrlTree([router.parseUrl('/auth/login')], {
  //     queryParams: { loggedOut: true, origUrl: state.url }
  //   } )),
  //   catchError((err) => {
  //     router.navigate(['/auth/login'], {
  //       queryParams: { loggedOut: true, origUrl: state.url }
  //     });
  //     return of(false);
  //   })
  // )
  const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
  const token = localStorage.getItem('token');
  // if (user && user.accessToken) {
    if (testV==2) {
    const currentPage = state.url;
    sharedStateService.setCurrentPage(currentPage);
    console.log('######----',currentPage);
 
    return true;
  } else {
    // router.navigate(['auth/login']);
    return false;
  }
  
 
}

