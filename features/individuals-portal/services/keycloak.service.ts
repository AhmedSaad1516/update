import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  baseUrl = environment.keycloak;
  constructor(private HttpService: HttpClient) {}

  getToken(): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'CLI_MASTER');
    body.set('username', 'shehab');
    body.set('password', '1234567');
    body.set('client_secret', 'Qx9jW77IlEK0ivry7rUZ5Wv8qojyMy91');
    return this.HttpService.post<any>(
      `${this.baseUrl}`,
      body
      // {
      //   grant_type: 'password',
      //   client_id: 'CLI_MASTER',
      //   username: 'shehab',
      //   password: '1234567',
      //   client_secret: 'Qx9jW77IlEK0ivry7rUZ5Wv8qojyMy91',
      // }
    );
  }
}
