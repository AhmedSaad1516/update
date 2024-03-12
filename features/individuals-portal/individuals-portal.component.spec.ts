import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  HorizontalFooterComponent,
  HorizontalHeaderComponent,
} from '@taqeem-workspace/general-lib';
import { IndividualsPortalComponent } from './individuals-portal.component';
import { AddEvaluationRequestRealestateComponent } from './screens/add-evaluation-request-realestate/add-evaluation-request-realestate.component';

describe('IndividualsPortal', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IndividualsPortalComponent,
        HorizontalHeaderComponent,
        HorizontalFooterComponent,
        AddEvaluationRequestRealestateComponent,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //   it('HttpClient testing', () => {});

  it('should create the header', () => {
    const fixture = TestBed.createComponent(HorizontalHeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the footer', () => {
    const fixture = TestBed.createComponent(HorizontalFooterComponent);
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

  it('should create the individuals portal', () => {
    const fixture = TestBed.createComponent(IndividualsPortalComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
