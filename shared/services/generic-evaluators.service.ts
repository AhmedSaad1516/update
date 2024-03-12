import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

// import { genericResponse } from '../model/genericResponse';

@Injectable({
  providedIn: 'root'
})
export class GenericEvaluatorsService {
  private apiUrl: string;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    // Set the API URL using the environment variable
    this.apiUrl = environment.apiRootAfterLogin;
  }
  getCustom<T> (endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }
  get<T>(endpoint: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }

  // POST request
  post<T>(endpoint: string, body: any ): Observable<T> {
    
    const url = `${this.apiUrl}/${endpoint}`;
    // const url = `${endpoint}`;

    return this.http.post<T>(url, body);
  }

  // PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.put<T>(url, body);
  }
  download<ArrayBuffer>(endpoint: string): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<ArrayBuffer>(url);
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }

userDecodeJWT() {
  const user = localStorage.getItem('token');
  if (!user) {
    return false;
  }
  const token = this.jwtHelper.decodeToken(user);
  return token;
}
}
