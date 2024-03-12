import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EvaluatorsPortalRequestComponent } from './evaluators-portal-request.component';
import { EvaluatorsRequestInformationComponent } from './evaluators-request-information/evaluators-request-information.component';
import { DoneAddQualificationComponent } from './done-add-qualification/done-add-qualification.component';
import { ChoosingEvaluatorsImageProfileComponent } from './choosing-evaluators-image-profile/choosing-evaluators-image-profile.component';

describe('AddEvaluationRequestRealestate', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EvaluatorsPortalRequestComponent,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        EvaluatorsRequestInformationComponent,
        DoneAddQualificationComponent,
        ChoosingEvaluatorsImageProfileComponent,
      ],
      providers: [],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the valuation request information ', () => {
    const fixture = TestBed.createComponent(
      EvaluatorsPortalRequestComponent
    );
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the asset information', () => {
    const fixture = TestBed.createComponent(DoneAddQualificationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the choosing specific valuation organization', () => {
    const fixture = TestBed.createComponent(
      ChoosingEvaluatorsImageProfileComponent
    );
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the add evaluation request realestate', () => {
    const fixture = TestBed.createComponent(
      EvaluatorsRequestInformationComponent
    );
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
