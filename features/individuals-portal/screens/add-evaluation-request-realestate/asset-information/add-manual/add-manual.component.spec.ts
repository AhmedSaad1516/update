import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  realestateTypeList,
  realestateUsageList,
  valuationRequestInformationList,
} from '../../../../data/dummy-test-data';
import { AddManualComponent } from './add-manual.component';
import { AddEvaluationRequestRealestateService } from './../../../../services/add-evaluation-request-realestate.service';

describe('AssetInformation', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<AddManualComponent>;
  let component: AddManualComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        AddManualComponent,
        BrowserAnimationsModule,
      ],
      providers: [AddEvaluationRequestRealestateService],
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AddManualComponent);
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

  it('should create the Lookup', () => {
    expect(component.initForm).toBeTruthy();
  });

  it('Should create a form with 7 controls', () => {
    expect(component.assetInformationForm.get('ownershipNumber')).toBeTruthy();
    expect(
      component.assetInformationForm.get('ownershipFilePath')
    ).toBeTruthy();
    expect(
      component.assetInformationForm.get('realestateTypeCode')
    ).toBeTruthy();
    expect(
      component.assetInformationForm.get('realestateUsageCode')
    ).toBeTruthy();
    expect(
      component.assetInformationForm.get('realestateAgeDays')
    ).toBeTruthy();
    expect(component.assetInformationForm.get('realestateArea')).toBeTruthy();
    expect(
      component.assetInformationForm.get('googleFullAddress')
    ).toBeTruthy();
  });

  it('should validate ownershipNumber as required', () => {
    const control = component.assetInformationForm.get('ownershipNumber');
    if (control) {
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();
      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].ownershipNumber
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0].ownershipNumber
      );
    } else {
      fail();
    }
  });

  it('should validate ownershipFilePath as required', () => {
    const control = component.assetInformationForm.get('ownershipFilePath');
    if (control) {
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();
      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].ownershipFilePath
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0].ownershipFilePath
      );
    } else {
      fail();
    }
  });

  it('should validate realestateTypeCode as required', () => {
    const control = component.assetInformationForm.get('realestateTypeCode');
    if (control) {
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      control.setValue('');
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].ownershipFilePath
      );
      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].realestateTypeCode
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0].realestateTypeCode
      );
    } else {
      fail();
    }
  });

  it('should validate realestateUsageCode as required', () => {
    const control = component.assetInformationForm.get('realestateUsageCode');
    if (control) {
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      control.setValue('');
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].ownershipFilePath
      );
      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0]
          .realestateUsageCode
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0]
          .realestateUsageCode
      );
    } else {
      fail();
    }
  });

  it('should validate realestateAgeDays as required', () => {
    const control = component.assetInformationForm.get('realestateAgeDays');
    if (control) {
      expect(control.hasError('required')).toBeTrue();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].ownershipFilePath
      );
      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].realestateAgeDays
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0].realestateAgeDays
      );
    } else {
      fail();
    }
  });

  it('should validate realestateArea as required', () => {
    const control = component.assetInformationForm.get('realestateArea');
    if (control) {
      expect(control.hasError('required')).toBeTrue();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].ownershipFilePath
      );
      expect(control.hasError('pattern')).toBeTruthy();
      expect(control.valid).toBeFalsy();

      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].realestateArea
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.hasError('pattern')).toBeFalsy();
      expect(control.valid).toBeTruthy();

      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0].realestateArea
      );
    } else {
      fail();
    }
  });

  it('should validate googleFullAddress as required', () => {
    const control = component.assetInformationForm.get('googleFullAddress');
    if (control) {
      expect(control.hasError('required')).toBeTruthy();
      expect(control.valid).toBeFalsy();
      control.setValue(
        valuationRequestInformationList.realEstateDTOList![0].googleFullAddress
      );
      expect(control.hasError('required')).toBeFalsy();
      expect(control.valid).toBeTruthy();
      expect(control.value).toBe(
        valuationRequestInformationList.realEstateDTOList![0].googleFullAddress
      );
    } else {
      fail();
    }
  });
});
