import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lookup } from '@taqeem-workspace/general-lib';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ValuationRequestInformation } from './../models/valuation-request-information';

@Injectable({
  providedIn: 'root',
})
export class AddEvaluationRequestRealestateService {
  baseUrl = environment.apiRoot;
  baseUrlLookup = environment.apiLookup;
  constructor(private HttpService: HttpClient) {}

  postValuationRequestInformation(
    valuationRequestInformation: ValuationRequestInformation
  ): Observable<any> {
    return this.HttpService.post<ValuationRequestInformation>(
      `${this.baseUrl}/create`,
      valuationRequestInformation
    );
  }

  getValuationRequestInformation(applicationNumber: string): Observable<any> {
    return this.HttpService.get<any>(
      `${this.baseUrl}/applicationNumber/${applicationNumber}`
    ).pipe(
      map((data) => {
        // const posts: ValuationRequestInformation[] = [];
        // for (let key in data) {
        //   posts.push({ ...data[key] });
        // }
        return data.data;
      })
    );
  }

  cancelValuationRequestInformation(
    appNumber: string,
    rootProcessInstanceId: string
  ): Observable<any> {
    return this.HttpService.post<any>(`${this.baseUrl}/cancel`, {
      applicationNumber: appNumber,
      rootProcessInstanceId: rootProcessInstanceId,
    });
  }

  getPurposeValuationLookup(): Observable<Lookup[]> {
    return this.HttpService.get<Lookup[]>(
      `${this.baseUrlLookup}/EVALUATION_REASON`
    );
  }

  getRealestateTypeLookup(): Observable<Lookup[]> {
    return this.HttpService.get<Lookup[]>(
      `${this.baseUrlLookup}/SUBJECT_AESSET_TYPE`
    );
  }

  getRealestateUsageLookup(): Observable<Lookup[]> {
    return this.HttpService.get<Lookup[]>(
      `${this.baseUrlLookup}/USAGE_SUBJECT_AESSET`
    );
  }

  getStepper(applicationNumber: string): any {
    return this.HttpService.get<any>(
      `http://172.16.40.131:8088/external-ingress/restricted/api/v1/application-steps/applicationNumber/${applicationNumber}`
    );
  }
  postStepper(
    appNumber: string,
    rootProcessInstanceId: string
  ): Observable<any> {
    return this.HttpService.post<any>(`${this.baseUrl}/process`, {
      applicationNumber: appNumber,
      rootProcessInstanceId: rootProcessInstanceId,
    });
  }

  getActionStepper(applicationNumber: string): any {
    return this.HttpService.get<any>(
      `${this.baseUrl}/allowed/${applicationNumber}`
    );
  }
}
