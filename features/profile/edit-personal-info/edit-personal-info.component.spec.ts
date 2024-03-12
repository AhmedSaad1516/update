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
import { EditPersonalInfoComponent } from './edit-personal-info.component';
// import {  } from './screens/add-evaluation-request-realestate/add-evaluation-request-realestate.component';

describe('EvaluatorsPortal', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditPersonalInfoComponent,
        HorizontalHeaderComponent,
        HorizontalFooterComponent,
        // AddEvaluationRequestRealestateComponent,
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
    // const fixture = TestBed.createComponent(
    //   AddEvaluationRequestRealestateComponent
    // );
    // const app = fixture.componentInstance;
    // expect(app).toBeTruthy();
  });

  it('should create the evaluators portal', () => {
    const fixture = TestBed.createComponent(EditPersonalInfoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
