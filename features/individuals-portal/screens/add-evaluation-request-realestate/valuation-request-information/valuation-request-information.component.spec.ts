import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ValuationRequestInformationComponent } from './valuation-request-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEvaluationRequestRealestateService } from '../../../services/add-evaluation-request-realestate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  purposeValuationList,
  valuationRequestInformationList,
} from '../../../data/dummy-test-data';
describe('ValuationRequestInformation', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<ValuationRequestInformationComponent>;
  let component: ValuationRequestInformationComponent;
  let mockAddEvaluationRequestRealestateService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        ValuationRequestInformationComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        AddEvaluationRequestRealestateService,
        // {
        //   provide: AddEvaluationRequestRealestateService,
        //   useValue: mockAddEvaluationRequestRealestateService,
        // },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockAddEvaluationRequestRealestateService = jasmine.createSpyObj([
      'getPurposeValuationLookup',
    ]);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ValuationRequestInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the valuation request information', () => {
    expect(component).toBeTruthy();
  });

  it('should create the Init Form', () => {
    expect(component.initForm).toBeTruthy();
  });

  it('should create the Full Form', () => {
    expect(component.fullForm).toBeTruthy();
  });

  it('should create the Get Lookup', () => {
    expect(component.getLookup).toBeTruthy();
    const omer = component.getLookup();
    fixture.detectChanges();
  });

  it('Should create a form with 5 controls', () => {
    expect(component.infoEvaluationForm.get('valuationTitle')).toBeTruthy();
    expect(component.infoEvaluationForm.get('description')).toBeTruthy();
    expect(component.infoEvaluationForm.get('purposeValuationId')).toBeTruthy();
    expect(
      component.infoEvaluationForm.get('cancellationDurationValuationDate')
    ).toBeTruthy();
    expect(component.infoEvaluationForm.get('isOneAsset')).toBeTruthy();
  });

  it('should validate valuationTitle as required', () => {
    const control = component.infoEvaluationForm.get('valuationTitle');
    if (control) {
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();
      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.valuationTitle
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO.valuationTitle
      );
    } else {
      fail();
    }
  });

  it('should validate description as required', () => {
    const control = component.infoEvaluationForm.get('description');
    if (control) {
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();
      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.description
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO.description
      );
    } else {
      fail();
    }
  });

  it('should validate purposeValuationId as required', () => {
    const control = component.infoEvaluationForm.get('purposeValuationId');
    if (control) {
      expect(control.valid).toBeTruthy();
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();

      control.setValue('');
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.description
      );
      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO
          .purposeValuationCode
      );

      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO
          .purposeValuationCode
      );
    } else {
      fail();
    }
  });

  it('should validate cancellationDurationValuationDate as required', () => {
    const control = component.infoEvaluationForm.get(
      'cancellationDurationValuationDate'
    );
    if (control) {
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();
      control.setValue(
        valuationRequestInformationList.applicationRequestDTO
          .cancellationDurationValuationDate
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO
          .cancellationDurationValuationDate
      );
    } else {
      fail();
    }
  });

  it('should validate isOneAsset as required', () => {
    const control = component.infoEvaluationForm.get('isOneAsset');
    if (control) {
      expect(control.valid).toBeTruthy();
      control.setValue('');
      expect(control.valid).toBeFalse();
      control.setValue(false);
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(false);
    } else {
      fail();
    }
  });
});
