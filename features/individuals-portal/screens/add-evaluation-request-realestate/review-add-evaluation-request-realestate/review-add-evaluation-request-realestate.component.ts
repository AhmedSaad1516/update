import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import {
  CancelButtonComponent,
  DataTableComponent,
  SharedButtonComponent,
} from '@taqeem-workspace/general-lib';
import { AssetInformation } from '../../../models/asset-information';
import { ValuationRequestInformation } from '../../../models/valuation-request-information';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { getValuationRequestRealestateState } from '../../state/valuation-request-realestate.selector';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ValuationRequestInformationValidation } from '../../../models/valuation-request-information-validation';
import { AddEvaluationRequestRealestateService } from '../../../services/add-evaluation-request-realestate.service';
import { addValuationRequestRealestate } from '../../state/valuation-request-realestate.actions';

@Component({
  selector: 'app-review-add-evaluation-request-realestate',
  templateUrl: './review-add-evaluation-request-realestate.component.html',
  styleUrls: ['./review-add-evaluation-request-realestate.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    MatDividerModule,
    DataTableComponent,
    CancelButtonComponent,
    SharedButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    CommonModule,
  ],
})
export class ReviewAddEvaluationRequestRealestateComponent implements OnInit {
  @Output() callParrentToGoToNextStep: EventEmitter<string> =
    new EventEmitter<string>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
  title: string = 'منشأة تقييم 1';
  title1: string = 'منشأة تقييم 2';
  title2: string = 'منشأة تقييم 3';
  dataSourceAssetInformation: AssetInformation[] | undefined = [];
  displayedColumns: { [index: string]: string } = {
    ownershipNumber: 'assetInformation.assetDeedNumber',
    realestateTypeName: 'assetInformation.subjectAssetTypeTable',
    realestateUsageName: 'assetInformation.currentUsageSubjectAssetTable',
    realestateArea: 'assetInformation.areaSize',
    realestateAgeDays: 'assetInformation.assetAge',
    ownershipFilePath: 'assetInformation.assetDeedDocumentTable',
    googleExtraInfo: 'assetInformation.assetLocation',
  };
  isFilter: boolean = false;
  showSpinner: boolean = false;
  valuationRequestInformation!: Observable<ValuationRequestInformation[]>;
  valuationRequestInformation1!: ValuationRequestInformation;
  messageError: string = '';
  typeError: string = 'alert-danger';
  valuationRequestInformationValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
  appNumber: string = '';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService
  ) {}

  ngOnInit() {
    this.valuationRequestInformation = this.store.select(
      getValuationRequestRealestateState
    );
  }

  goToBack() {
    this.callParrentToGoToPrevStep.emit(undefined);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  submitForm() {
    this.showSpinner = true;

    this.valuationRequestInformation1 = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
    this.valuationRequestInformation1 = {
      applicationRequestDTO: {
        ...this.valuationRequestInformation1.applicationRequestDTO,
      },
      realEstateDTOList: this.valuationRequestInformation1.realEstateDTOList,
      applicationValuationOrganizationDTOList:
        this.valuationRequestInformation1
          .applicationValuationOrganizationDTOList,
    };

    this.addEvaluationRequestRealestateService
      .postValuationRequestInformation(this.valuationRequestInformation1)
      .subscribe(
        (response: any) => {
          this.appNumber = response.data.applicationNumber;
          localStorage.setItem('appNumber', this.appNumber);

          localStorage.setItem(
            'rootProcessInstanceId',
            response.data.rootProcessInstanceId
          );
          this.callParrentToGoToNextStep.emit(this.appNumber);
          this.showSpinner = false;
        },
        (error: any) => {
          if (error) {
            if (error?.error?.error.status === 409) {
              this.biningError(error?.error?.error.validation_errors);
              if (this.valuationRequestInformationValidation.isFrist) {
                this.callParrentToGoToPrevStep.emit(
                  this.valuationRequestInformationValidation
                );
                this.callParrentToGoToPrevStep.emit(
                  this.valuationRequestInformationValidation
                );
              }
              if (this.valuationRequestInformationValidation.isSecond) {
                this.callParrentToGoToPrevStep.emit(
                  this.valuationRequestInformationValidation
                );
              }
            } else this.messageError = error;

            this.showSpinner = false;
          }
        }
      );
    // this.callParrentToGoToNextStep.emit(undefined);
  }

  biningError(error: any): ValuationRequestInformationValidation {
    this.valuationRequestInformationValidation = {
      isFrist: false,
      isSecond: false,
      isThird: false,
      isMultiRealestate: false,
      VALUATION_TITLE_VALIDATION_MESSAGE:
        error?.['applicationRequestDTO.valuationTitle'] === undefined
          ? ''
          : 'valuationRequestInformation.' +
            error?.['applicationRequestDTO.valuationTitle'],
      OWNERSHIP_NUMBER_VALIDATION_MESSAGE:
        error?.['realEstateDTOList[0].ownershipNumber'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].ownershipNumber'],
      PURPOSE_VALUATION_Id_VALIDATION_MESSAGE:
        error?.['applicationRequestDTO.purposeValuationId'] === undefined
          ? ''
          : 'valuationRequestInformation.' +
            error?.['applicationRequestDTO.purposeValuationId'],
      REASON_VALUATION_DETAILS_VALIDATION_MESSAGE: '',
      AUTOMATIC_SELECTION_OFFER_DURATION:
        error?.['applicationRequestDTO.automaticSelectionOfferDuration'] ===
        undefined
          ? ''
          : 'valuationOrganization.' +
            error?.['applicationRequestDTO.automaticSelectionOfferDuration'],
      DYNAMIC_DISTRIBUTION_REQUEST_DURATION_MESSAGE:
        error?.['applicationRequestDTO.isDynamic'] === undefined
          ? ''
          : 'valuationOrganization.' +
            error?.['applicationRequestDTO.isDynamic'],
      NUMBER_OF_REPORTS_MESSAGE:
        error?.['applicationRequestDTO.numberOfReports'] === undefined
          ? ''
          : 'valuationOrganization.' +
            error?.['applicationRequestDTO.numberOfReports'],
      APPLICATION_TYPE_MESSAGE: '',
      CUSTOMER_ID_MESSAGE: '',
      DESCRIPTION_MESSAGE:
        error?.['applicationRequestDTO.description'] === undefined
          ? ''
          : 'valuationRequestInformation.' +
            error?.['applicationRequestDTO.description'],
      REPORT_DELIVERY_DATE_MESSAGE:
        error?.['applicationRequestDTO.reportDeliveryDate'] === undefined
          ? ''
          : 'valuationOrganization.' +
            error?.['applicationRequestDTO.reportDeliveryDate'],
      CANCELlATION_DURATION_VALUEATION_DATE:
        error?.['applicationRequestDTO.cancellationDurationValuationDate'] ===
        undefined
          ? ''
          : 'valuationRequestInformation.' +
            error?.['applicationRequestDTO.cancellationDurationValuationDate'],
      REAL_ESTATE_TYPE_MESSAGE:
        error?.['realEstateDTOList[0].realestateTypeId'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].realestateTypeId'],
      REAL_ESTATE_USAGE_MESSAGE:
        error?.['realEstateDTOList[0].realestateUsageId'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].realestateUsageId'],
      GOOGLE_LOCATION_X_MESSAGE:
        error?.['realEstateDTOList[0].locationX'] === undefined
          ? ''
          : 'assetInformation.' + error?.['realEstateDTOList[0].locationX'],
      GOOGLE_LOCATION_Y_MESSAGE:
        error?.['realEstateDTOList[0].locationY'] === undefined
          ? ''
          : 'assetInformation.' + error?.['realEstateDTOList[0].locationY'],
      REAL_ESTATE_AREA_MESSAGE:
        error?.['realEstateDTOList[0].realestateArea'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].realestateArea'],
      GOOGLE_FULL_ADDRESS_MESSAGE:
        error?.['realEstateDTOList[0].googleFullAddress'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].googleFullAddress'],
      GOOGLE_COUNTRY_NAME_MESSAGE:
        error?.['realEstateDTOList[0].googleCountryName'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].googleCountryName'],
      GOOGLE_CITY_NAME_MESSAGE:
        error?.['realEstateDTOList[0].googleCityName'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].googleCityName'],
      GOOGLE_DISTRICT_NAME_MESSAGE:
        error?.['realEstateDTOList[0].googleDistrictName'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].googleDistrictName'],
      GOOGLE_COUNTRY_EXTRA_MESSAGE:
        error?.['realEstateDTOList[0].googleExtraInfo'] === undefined
          ? ''
          : 'assetInformation.' +
            error?.['realEstateDTOList[0].googleExtraInfo'],
      VALUATION_ORGANIZATION_MESSAGE: '',
    };
    if (
      this.valuationRequestInformationValidation
        .VALUATION_TITLE_VALIDATION_MESSAGE ||
      this.valuationRequestInformationValidation
        .PURPOSE_VALUATION_Id_VALIDATION_MESSAGE ||
      this.valuationRequestInformationValidation.DESCRIPTION_MESSAGE ||
      this.valuationRequestInformationValidation
        .CANCELlATION_DURATION_VALUEATION_DATE
    )
      this.valuationRequestInformationValidation.isFrist = true;
    else this.valuationRequestInformationValidation.isFrist = false;

    if (
      this.valuationRequestInformationValidation
        .OWNERSHIP_NUMBER_VALIDATION_MESSAGE ||
      this.valuationRequestInformationValidation.REAL_ESTATE_TYPE_MESSAGE ||
      this.valuationRequestInformationValidation.REAL_ESTATE_USAGE_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_LOCATION_X_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_LOCATION_Y_MESSAGE ||
      this.valuationRequestInformationValidation.REAL_ESTATE_AREA_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_FULL_ADDRESS_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_COUNTRY_NAME_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_CITY_NAME_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_DISTRICT_NAME_MESSAGE ||
      this.valuationRequestInformationValidation.GOOGLE_COUNTRY_EXTRA_MESSAGE
    )
      this.valuationRequestInformationValidation.isSecond = true;
    else this.valuationRequestInformationValidation.isSecond = false;

    const containsAngular = Object.keys(error).some((key) =>
      key.includes('[1]')
    );
    this.valuationRequestInformationValidation.isMultiRealestate =
      containsAngular;

    return this.valuationRequestInformationValidation;
  }
}
