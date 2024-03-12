import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AddEvaluationRequestRealestateComponent } from './add-evaluation-request-realestate.component';
import { ValuationRequestInformationComponent } from './valuation-request-information/valuation-request-information.component';
import { AssetInformationComponent } from './asset-information/asset-information.component';
import { ChoosingSpecificValuationOrganizationComponent } from './choosing-specific-valuation-organization/choosing-specific-valuation-organization.component';

describe('AddEvaluationRequestRealestate', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddEvaluationRequestRealestateComponent,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ValuationRequestInformationComponent,
        AssetInformationComponent,
        ChoosingSpecificValuationOrganizationComponent,
      ],
      providers: [],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the valuation request information ', () => {
    const fixture = TestBed.createComponent(
      ValuationRequestInformationComponent
    );
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the asset information', () => {
    const fixture = TestBed.createComponent(AssetInformationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the choosing specific valuation organization', () => {
    const fixture = TestBed.createComponent(
      ChoosingSpecificValuationOrganizationComponent
    );
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the add evaluation request realestate', () => {
    const fixture = TestBed.createComponent(
      AddEvaluationRequestRealestateComponent
    );
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
