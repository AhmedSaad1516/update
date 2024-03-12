import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  // constructor(private AlertService: AlertService) {}
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = environment.apiRoot;
    const authToken =localStorage.getItem('access_token')?localStorage.getItem('access_token'):null;
    // const reqCopy = request.clone();

    ////////////////
    const reqCopy = request.clone({
      // url: `${baseUrl}`,
      headers: request.headers
        .set('access-control-expose-headers', 'Authorization')
        .set('AcceptLanguage', 'en')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        .set('Access-Control-Allow-Headers', 'Content-Type')
        .set('Access-Control-Allow-Credentials', 'true'),
    });

    ////
    // reqCopy.headers.set('AcceptLanguage', 'en');// we will replace  'en' by real lang from local storage
    // reqCopy.headers.set('token', 'accestoken'); // we will replace  'accestoken' by real token from local storage
    // reqCopy.headers.set('access-control-expose-headers', 'Authorization'); // we will replace  'accestoken' by real token from local storage
    // response.addHeader("access-control-expose-headers", "Authorization");

    this.activeRequests++;

    // this.SpinnerService.isLoading.next(true);

    return next.handle(reqCopy).pipe(
      map((event) => {
        return event;
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          // this.SpinnerService.isLoading.next(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        let errors;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          if (typeof error.error == 'string') {
            errorMsg = ` ${JSON.parse(error.error)?.error?.message}`;
          } else {
            errorMsg = ` ${error.error?.error?.message}`;
          }
        }
        return throwError(errorMsg);
      })
    );
  }
}
