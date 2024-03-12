import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  purposeValuationList,
  realestateTypeList,
  realestateUsageList,
  valuationRequestInformationList,
  valuationRequestInformationResult,
} from '../data/dummy-test-data';
import { AddEvaluationRequestRealestateService } from './add-evaluation-request-realestate.service';

import { HttpClient } from '@angular/common/http';
import { Lookup } from '@taqeem-workspace/general-lib';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

describe('Add Evaluation Request Realestate Service', () => {
  let addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddEvaluationRequestRealestateService],
      imports: [HttpClientTestingModule],
    });

    addEvaluationRequestRealestateService = TestBed.inject(
      AddEvaluationRequestRealestateService
    );
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return purpose valuation list when getPurposeValuationLookup() is called', (done: DoneFn) => {
    addEvaluationRequestRealestateService
      .getPurposeValuationLookup()
      .subscribe((data) => {
        expect(data).toEqual(purposeValuationList);
        done();
      });

    const request = httpTestingController.expectOne(
      'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/EVALUATION_REASON'
    );
    request.flush(purposeValuationList);
    expect(request.request.method).toBe('GET');
  });

  it('should return Realestate Type when getRealestateTypeLookup() is called', (done: DoneFn) => {
    addEvaluationRequestRealestateService
      .getRealestateTypeLookup()
      .subscribe((data) => {
        expect(data).toEqual(realestateTypeList);
        done();
      });

    const request = httpTestingController.expectOne(
      'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/SUBJECT_AESSET_TYPE'
    );
    request.flush(realestateTypeList);
    expect(request.request.method).toBe('GET');
  });

  it('should return Realestate Usage when getRealestateUsageLookup() is called', (done: DoneFn) => {
    addEvaluationRequestRealestateService
      .getRealestateUsageLookup()
      .subscribe((data) => {
        expect(data).toEqual(realestateUsageList);
        done();
      });

    const request = httpTestingController.expectOne(
      'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/USAGE_SUBJECT_AESSET'
    );
    request.flush(realestateUsageList);
    expect(request.request.method).toBe('GET');
  });

  it('should return valuation Request Information Result when postValuationRequestInformation() is called', (done: DoneFn) => {
    addEvaluationRequestRealestateService
      .postValuationRequestInformation(valuationRequestInformationList)
      .subscribe((data) => {
        expect(data).toEqual(valuationRequestInformationResult);
        done();
      });

    const request = httpTestingController.expectOne(
      `${environment.apiRoot}/create`
    );
    request.flush(valuationRequestInformationResult);
    expect(request.request.method).toBe('POST');
  });
});

describe('Spy Add Evaluation Request Realestate Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let addEvaluationRequestRealestateService1: AddEvaluationRequestRealestateService;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AddEvaluationRequestRealestateService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    addEvaluationRequestRealestateService1 = TestBed.inject(
      AddEvaluationRequestRealestateService
    );
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });
  it('should return expected purpose valuation list when getPurposeValuationLookup is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(purposeValuationList));
    addEvaluationRequestRealestateService1
      .getPurposeValuationLookup()
      .subscribe({
        next: (purposeValuation) => {
          expect(purposeValuation).toEqual(purposeValuationList);
          done();
        },
        error: () => {
          done.fail;
        },
      });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return expected realestate type list when getRealestateTypeLookup is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(realestateTypeList));
    addEvaluationRequestRealestateService1.getRealestateTypeLookup().subscribe({
      next: (realestateType) => {
        expect(realestateType).toEqual(realestateTypeList);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return expected realestate usage list when getRealestateUsageLookup is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(realestateUsageList));
    addEvaluationRequestRealestateService1
      .getRealestateUsageLookup()
      .subscribe({
        next: (realestateUsage) => {
          expect(realestateUsage).toEqual(realestateUsageList);
          done();
        },
        error: () => {
          done.fail;
        },
      });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return expected valuation request information Result when postValuationRequestInformation is called', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(valuationRequestInformationResult));
    addEvaluationRequestRealestateService1
      .postValuationRequestInformation(valuationRequestInformationList)
      .subscribe({
        next: (RequestInformation) => {
          expect(RequestInformation).toEqual(valuationRequestInformationResult);
          done();
        },
        error: () => {
          done.fail;
        },
      });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});

describe('Http Client Testing Module Add Evaluation Request Realestate Service', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call the EVALUATION_REASON Url with get Lookup', () => {
    httpClient
      .get<Lookup[]>(
        'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/EVALUATION_REASON'
      )
      .subscribe((data) => {
        expect(data).toEqual(purposeValuationList);
      });
    const request = httpTestingController.expectOne(
      'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/EVALUATION_REASON'
    );
    request.flush(purposeValuationList);
    expect(request.request.method).toBe('GET');
  });

  it('should call the SUBJECT_AESSET_TYPE Url with get Lookup', () => {
    httpClient
      .get<Lookup[]>(
        'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/SUBJECT_AESSET_TYPE'
      )
      .subscribe((data) => {
        expect(data).toEqual(realestateTypeList);
      });
    const request = httpTestingController.expectOne(
      'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/SUBJECT_AESSET_TYPE'
    );
    request.flush(realestateTypeList);
    expect(request.request.method).toBe('GET');
  });

  it('should call the USAGE_SUBJECT_AESSET Url with get Lookup', () => {
    httpClient
      .get<Lookup[]>(
        'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/USAGE_SUBJECT_AESSET'
      )
      .subscribe((data) => {
        expect(data).toEqual(realestateUsageList);
      });
    const request = httpTestingController.expectOne(
      'http://172.16.40.131:8086/internal-ingress/restricted/api/v1/lookup/fetch/USAGE_SUBJECT_AESSET'
    );
    request.flush(realestateUsageList);
    expect(request.request.method).toBe('GET');
  });

  it('should call the Create Url with post valuation Request Information Result', () => {
    httpClient
      .post(`${environment.apiRoot}/create`, valuationRequestInformationList)
      .subscribe((data) => {
        expect(data).toEqual(valuationRequestInformationResult);
      });
    const request = httpTestingController.expectOne(
      `${environment.apiRoot}/create`
    );
    request.flush(valuationRequestInformationResult);
    expect(request.request.method).toBe('POST');
  });
});
