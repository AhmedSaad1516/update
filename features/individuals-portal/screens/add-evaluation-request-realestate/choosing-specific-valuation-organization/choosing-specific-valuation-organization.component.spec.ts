import { ChoosingSpecificValuationOrganizationComponent } from './choosing-specific-valuation-organization.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  realestateTypeList,
  realestateUsageList,
  valuationRequestInformationList,
} from '../../../data/dummy-test-data';
import { AddEvaluationRequestRealestateService } from './../../../services/add-evaluation-request-realestate.service';

describe('AssetInformation', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<ChoosingSpecificValuationOrganizationComponent>;
  let component: ChoosingSpecificValuationOrganizationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        ChoosingSpecificValuationOrganizationComponent,
        BrowserAnimationsModule,
      ],
      providers: [AddEvaluationRequestRealestateService],
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(
      ChoosingSpecificValuationOrganizationComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the asset information', () => {
    expect(component).toBeTruthy();
  });

  it('should create the Init Form', () => {
    expect(component.initForm).toBeTruthy();
  });

  it('should create the Full Form', () => {
    expect(component.initForm).toBeTruthy();
  });

  it('Should create a form with 6 controls', () => {
    expect(
      component.choosingValuationOrganizationForm.get('isDynamic')
    ).toBeTruthy();
    expect(
      component.choosingValuationOrganizationForm.get(
        'automaticSelectionOfferDuration'
      )
    ).toBeTruthy();
    expect(
      component.choosingValuationOrganizationForm.get(
        'applicationValuationOrganizationDTOList'
      )
    ).toBeTruthy();
    expect(
      component.choosingValuationOrganizationForm.get('reportDeliveryDate')
    ).toBeTruthy();
    expect(
      component.choosingValuationOrganizationForm.get('requestOneReport')
    ).toBeTruthy();
    expect(
      component.choosingValuationOrganizationForm.get('numberOfReports')
    ).toBeTruthy();
  });

  it('should validate isDynamic as required', () => {
    const control =
      component.choosingValuationOrganizationForm.get('isDynamic');
    if (control) {
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      control.setValue('');
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.description
      );
      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.isDynamic ? 1 : 2
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO.isDynamic ? 1 : 2
      );
    } else {
      fail();
    }
  });

  it('should validate automaticSelectionOfferDuration as required', () => {
    const control = component.choosingValuationOrganizationForm.get(
      'automaticSelectionOfferDuration'
    );
    if (control) {
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      control.setValidators([
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]);
      control.updateValueAndValidity();
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.valuationTitle
      );

      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO
          .automaticSelectionOfferDuration
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO
          .automaticSelectionOfferDuration
      );
    } else {
      fail();
    }
  });

  it('should validate applicationValuationOrganizationDTOList as required', () => {
    const control = component.choosingValuationOrganizationForm.get(
      'applicationValuationOrganizationDTOList'
    );
    if (control) {
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationValuationOrganizationDTOList
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.applicationValuationOrganizationDTOList
      );
    } else {
      fail();
    }
  });

  it('should validate reportDeliveryDate as required', () => {
    const control =
      component.choosingValuationOrganizationForm.get('reportDeliveryDate');
    if (control) {
      expect(control.hasError('required')).toBeTrue();
      expect(control.valid).toBeFalse();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.reportDeliveryDate
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO.reportDeliveryDate
      );
    } else {
      fail();
    }
  });

  it('should validate requestOneReport as required', () => {
    const control =
      component.choosingValuationOrganizationForm.get('requestOneReport');
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

  it('should validate numberOfReports as required', () => {
    const control =
      component.choosingValuationOrganizationForm.get('numberOfReports');
    if (control) {
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      control.setValidators([
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]);
      control.updateValueAndValidity();
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.valuationTitle
      );

      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.applicationRequestDTO.numberOfReports
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.applicationRequestDTO.numberOfReports
      );
    } else {
      fail();
    }
  });
});
