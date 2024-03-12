import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class LoginService {
  isLoggedIn(): Observable<boolean> {
    // Implement your logic to check if the user is logged in.
    // You can use local storage or any authentication mechanism here.
    // For demonstration purposes, let's assume the user is logged in if the token exists in local storage.
    const token = localStorage.getItem('token');
    return of(!!token); // Convert the truthy/falsy value of token to a boolean value
  }
}