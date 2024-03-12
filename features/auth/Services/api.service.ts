import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'https://example.com/api/';

  constructor(private http: HttpClient) {}

  callXEndpoint() {
    const url = this.baseURL + 'x';
    return this.http.get(url);
  }

  callYEndpoint() {
    const url = this.baseURL + 'y';
    return this.http.get(url);
  }

  callZEndpoint() {
    const url = this.baseURL + 'z';
    return this.http.get(url);
  }
}