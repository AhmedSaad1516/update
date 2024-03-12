import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChoosingValuationOrganization } from './../../../models/choosing-valuation-organization';
import { ValuationOrganization } from './../../../models/valuation-organization';
import { AddEvaluationRequestRealestateService } from './../../../services/add-evaluation-request-realestate.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import {
  AlertComponent,
  CancelButtonComponent,
  CheckboxComponent,
  DatePickerComponent,
  InputFieldComponent,
  Lookup,
  RadioButtonComponent,
  SelectFieldComponent,
  SelectionListViewComponent,
  SharedButtonComponent,
} from '@taqeem-workspace/general-lib';
import { ValuationRequestInformation } from '../../../models/valuation-request-information';
import { ValuationRequestInformationValidation } from '../../../models/valuation-request-information-validation';
import { DoneAddEvaluationRequestRealestateComponent } from '../done-add-evaluation-request-realestate/done-add-evaluation-request-realestate.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { fullValuationRequestRealestate } from '../../state/valuation-request-realestate.actions';

@Component({
  selector: 'app-choosing-specific-valuation-organization',
  templateUrl: './choosing-specific-valuation-organization.component.html',
  styleUrls: ['./choosing-specific-valuation-organization.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SharedButtonComponent,
    CancelButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    InputFieldComponent,
    SelectFieldComponent,
    RadioButtonComponent,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    SelectionListViewComponent,
    DatePickerComponent,
    DoneAddEvaluationRequestRealestateComponent,
    AlertComponent,
  ],
})
export class ChoosingSpecificValuationOrganizationComponent implements OnInit {
  @Output() callParrentToGoToNextStep: EventEmitter<string> =
    new EventEmitter<string>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();

  radios: Lookup[] = [
    { id: 1, nameAr: 'لا، اختيار المنشأة تلقائياً', hintAr: '', code: '1' },
    { id: 2, nameAr: 'نعم، اختيار المنشأة يدوياً', hintAr: '', code: '2' },
  ];
  typesOfShoes = [
    {
      id: 1,
      name: 'منشأة 1',
      email: 'comany1@gmail.com',
      phone: '05487426885',
      location: 'الرياض، حي الملز',
    },
    {
      id: 2,
      name: 'منشأة 2',
      email: 'comany2@gmail.com',
      phone: '05324325643',
      location: 'الرياض، حي الغدير',
    },
    {
      id: 3,
      name: 'منشأة 3',
      email: 'comany3@gmail.com',
      phone: '05432967348',
      location: 'الرياض، حي الشمال',
    },
    {
      id: 4,
      name: 'منشأة 4',
      email: 'comany4@gmail.com',
      phone: '05348264554',
      location: 'الرياض، حي العزيزية',
    },
    {
      id: 5,
      name: 'منشأة 5',
      email: 'comany5@gmail.com',
      phone: '05280934874',
      location: 'الرياض، حي المنصورية',
    },
    {
      id: 6,
      name: 'منشأة 6',
      email: 'comany6@gmail.com',
      phone: '05443340934',
      location: 'الرياض، حي الروابي',
    },
  ];
  radioValue: string = '1';
  checkValue: boolean = true;
  appNumber: string = '';
  choosingValuationOrganizationForm: FormGroup = new FormGroup({});
  choosingValuationOrganization!: ChoosingValuationOrganization;
  valuationRequestInformation!: ValuationRequestInformation;

  organizationDTOList: ValuationOrganization[] = [];
  oneOrganization!: ValuationOrganization;
  messageError: string = '';
  typeError: string = 'alert-danger';
  valuationRequestInformationValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initForm();
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
  }

  initForm() {
    this.choosingValuationOrganizationForm = new FormGroup({
      isDynamic: new FormControl(null, Validators.required),
      automaticSelectionOfferDuration: new FormControl('', Validators.required),
      applicationValuationOrganizationDTOList: new FormControl([]),
      reportDeliveryDate: new FormControl('', Validators.required),
      requestOneReport: new FormControl(true, Validators.required),
      numberOfReports: new FormControl(''),
    });
  }

  fullForm() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
    this.valuationRequestInformation = {
      applicationRequestDTO: {
        ...this.valuationRequestInformation.applicationRequestDTO,
        isDynamic:
          this.choosingValuationOrganizationForm.get('isDynamic')?.value === '1'
            ? true
            : false,
        // applicationValuationOrganizationDTOList: this.choosingValuationOrganizationForm.get('applicationValuationOrganizationDTOList')?.value,
        automaticSelectionOfferDuration: parseInt(
          this.choosingValuationOrganizationForm.get(
            'automaticSelectionOfferDuration'
          )?.value
        ),
        reportDeliveryDate:
          this.choosingValuationOrganizationForm.get('reportDeliveryDate')
            ?.value,
        numberOfReports:
          this.choosingValuationOrganizationForm.get('requestOneReport')
            ?.value === true
            ? 1
            : parseInt(
                this.choosingValuationOrganizationForm.get('numberOfReports')
                  ?.value
              ),
      },
      realEstateDTOList: this.valuationRequestInformation.realEstateDTOList,
    };

    const applicationValuationOrganizationDTOList = this.getFormGroup(
      'applicationValuationOrganizationDTOList'
    ).value;
    this.organizationDTOList = [];
    for (let i = 0; i < applicationValuationOrganizationDTOList.length; i++) {
      this.oneOrganization = {
        valuationOrganizationId: applicationValuationOrganizationDTOList[i].id,
      };
      this.organizationDTOList.push(this.oneOrganization);
    }
    this.valuationRequestInformation.applicationValuationOrganizationDTOList =
      this.organizationDTOList;
    localStorage.setItem(
      'valuationRequestInformation',
      JSON.stringify(this.valuationRequestInformation)
    );
    this.store.dispatch(
      fullValuationRequestRealestate({
        valuationRequestInformation: this.valuationRequestInformation,
      })
    );
    this.callParrentToGoToNextStep.emit();
  }

  // submitForm() {
  //   this.fullForm();
  //   return;
  //   this.showSpinner = true;
  //   this.addEvaluationRequestRealestateService
  //     .postValuationRequestInformation(this.valuationRequestInformation)
  //     .subscribe(
  //       (response: any) => {
  //         this.appNumber = response.data.applicationNumber;
  //         localStorage.setItem('appNumber', this.appNumber);
  //         this.callParrentToGoToNextStep.emit(this.appNumber);
  //         // this.openDialog();
  //         this.showSpinner = false;
  //       },
  //       (error: any) => {
  //         if (error) {
  //           if (error?.error?.error.status === 409) {
  //             this.biningError(error?.error?.error.validation_errors);
  //             if (this.valuationRequestInformationValidation.isFrist) {
  //               this.callParrentToGoToPrevStep.emit(
  //                 this.valuationRequestInformationValidation
  //               );
  //               this.callParrentToGoToPrevStep.emit(
  //                 this.valuationRequestInformationValidation
  //               );
  //             }
  //             if (this.valuationRequestInformationValidation.isSecond) {
  //               this.callParrentToGoToPrevStep.emit(
  //                 this.valuationRequestInformationValidation
  //               );
  //             }
  //           } else this.messageError = error;

  //           this.showSpinner = false;
  //         }
  //       }
  //     );
  //   // this.callParrentToGoToNextStep.emit(undefined);
  // }

  getFormGroup(contralName: string): FormControl {
    return this.choosingValuationOrganizationForm?.get(
      contralName
    ) as FormControl;
  }

  checkChange() {
    this.checkValue =
      this.choosingValuationOrganizationForm.get('requestOneReport')?.value;
    if (this.checkValue) {
      this.choosingValuationOrganizationForm
        .get('numberOfReports')
        ?.clearValidators();
      this.choosingValuationOrganizationForm
        .get('numberOfReports')
        ?.updateValueAndValidity();
    } else {
      this.choosingValuationOrganizationForm
        .get('numberOfReports')
        ?.setValidators([Validators.required, Validators.pattern('^\\d*$')]);
      this.choosingValuationOrganizationForm
        .get('numberOfReports')
        ?.updateValueAndValidity();
    }
  }

  changeRadio() {
    setTimeout(() => {
      this.radioValue =
        this.choosingValuationOrganizationForm.get('isDynamic')?.value;
      if (this.radioValue === '2') {
        this.choosingValuationOrganizationForm
          .get('applicationValuationOrganizationDTOList')
          ?.setValidators(Validators.required);
        this.choosingValuationOrganizationForm
          .get('applicationValuationOrganizationDTOList')
          ?.updateValueAndValidity();
        this.choosingValuationOrganizationForm
          .get('automaticSelectionOfferDuration')
          ?.clearValidators();
        this.choosingValuationOrganizationForm
          .get('automaticSelectionOfferDuration')
          ?.updateValueAndValidity();
      } else {
        this.choosingValuationOrganizationForm
          .get('automaticSelectionOfferDuration')
          ?.setValidators([Validators.required, Validators.pattern('^\\d*$')]);
        this.choosingValuationOrganizationForm
          .get('automaticSelectionOfferDuration')
          ?.updateValueAndValidity();
        this.choosingValuationOrganizationForm
          .get('applicationValuationOrganizationDTOList')
          ?.clearValidators();
        this.choosingValuationOrganizationForm
          .get('applicationValuationOrganizationDTOList')
          ?.updateValueAndValidity();
      }
    }, 10);
  }

  openDialog() {
    this.callParrentToGoToNextStep.emit(undefined);
    // this.router.navigate(['home']);
    // let dialogRef = this.dialog.open(
    //   DoneAddEvaluationRequestRealestateComponent,
    //   { data: { appNumber: this.appNumber } }
    // );
    // dialogRef.afterClosed().subscribe((result) => {});
  }

  // biningError(error: any): ValuationRequestInformationValidation {
  //   this.valuationRequestInformationValidation = {
  //     isFrist: false,
  //     isSecond: false,
  //     isThird: false,
  //     isMultiRealestate: false,
  //     VALUATION_TITLE_VALIDATION_MESSAGE:
  //       error?.['applicationRequestDTO.valuationTitle'] === undefined
  //         ? ''
  //         : 'valuationRequestInformation.' +
  //           error?.['applicationRequestDTO.valuationTitle'],
  //     OWNERSHIP_NUMBER_VALIDATION_MESSAGE:
  //       error?.['realEstateDTOList[0].ownershipNumber'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].ownershipNumber'],
  //     PURPOSE_VALUATION_Id_VALIDATION_MESSAGE:
  //       error?.['applicationRequestDTO.purposeValuationId'] === undefined
  //         ? ''
  //         : 'valuationRequestInformation.' +
  //           error?.['applicationRequestDTO.purposeValuationId'],
  //     REASON_VALUATION_DETAILS_VALIDATION_MESSAGE: '',
  //     AUTOMATIC_SELECTION_OFFER_DURATION:
  //       error?.['applicationRequestDTO.automaticSelectionOfferDuration'] ===
  //       undefined
  //         ? ''
  //         : 'valuationOrganization.' +
  //           error?.['applicationRequestDTO.automaticSelectionOfferDuration'],
  //     DYNAMIC_DISTRIBUTION_REQUEST_DURATION_MESSAGE:
  //       error?.['applicationRequestDTO.isDynamic'] === undefined
  //         ? ''
  //         : 'valuationOrganization.' +
  //           error?.['applicationRequestDTO.isDynamic'],
  //     NUMBER_OF_REPORTS_MESSAGE:
  //       error?.['applicationRequestDTO.numberOfReports'] === undefined
  //         ? ''
  //         : 'valuationOrganization.' +
  //           error?.['applicationRequestDTO.numberOfReports'],
  //     APPLICATION_TYPE_MESSAGE: '',
  //     CUSTOMER_ID_MESSAGE: '',
  //     DESCRIPTION_MESSAGE:
  //       error?.['applicationRequestDTO.description'] === undefined
  //         ? ''
  //         : 'valuationRequestInformation.' +
  //           error?.['applicationRequestDTO.description'],
  //     REPORT_DELIVERY_DATE_MESSAGE:
  //       error?.['applicationRequestDTO.reportDeliveryDate'] === undefined
  //         ? ''
  //         : 'valuationOrganization.' +
  //           error?.['applicationRequestDTO.reportDeliveryDate'],
  //     CANCELlATION_DURATION_VALUEATION_DATE:
  //       error?.['applicationRequestDTO.cancellationDurationValuationDate'] ===
  //       undefined
  //         ? ''
  //         : 'valuationRequestInformation.' +
  //           error?.['applicationRequestDTO.cancellationDurationValuationDate'],
  //     REAL_ESTATE_TYPE_MESSAGE:
  //       error?.['realEstateDTOList[0].realestateTypeId'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].realestateTypeId'],
  //     REAL_ESTATE_USAGE_MESSAGE:
  //       error?.['realEstateDTOList[0].realestateUsageId'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].realestateUsageId'],
  //     GOOGLE_LOCATION_X_MESSAGE:
  //       error?.['realEstateDTOList[0].locationX'] === undefined
  //         ? ''
  //         : 'assetInformation.' + error?.['realEstateDTOList[0].locationX'],
  //     GOOGLE_LOCATION_Y_MESSAGE:
  //       error?.['realEstateDTOList[0].locationY'] === undefined
  //         ? ''
  //         : 'assetInformation.' + error?.['realEstateDTOList[0].locationY'],
  //     REAL_ESTATE_AREA_MESSAGE:
  //       error?.['realEstateDTOList[0].realestateArea'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].realestateArea'],
  //     GOOGLE_FULL_ADDRESS_MESSAGE:
  //       error?.['realEstateDTOList[0].googleFullAddress'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].googleFullAddress'],
  //     GOOGLE_COUNTRY_NAME_MESSAGE:
  //       error?.['realEstateDTOList[0].googleCountryName'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].googleCountryName'],
  //     GOOGLE_CITY_NAME_MESSAGE:
  //       error?.['realEstateDTOList[0].googleCityName'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].googleCityName'],
  //     GOOGLE_DISTRICT_NAME_MESSAGE:
  //       error?.['realEstateDTOList[0].googleDistrictName'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].googleDistrictName'],
  //     GOOGLE_COUNTRY_EXTRA_MESSAGE:
  //       error?.['realEstateDTOList[0].googleExtraInfo'] === undefined
  //         ? ''
  //         : 'assetInformation.' +
  //           error?.['realEstateDTOList[0].googleExtraInfo'],
  //     VALUATION_ORGANIZATION_MESSAGE: '',
  //   };
  //   if (
  //     this.valuationRequestInformationValidation
  //       .VALUATION_TITLE_VALIDATION_MESSAGE ||
  //     this.valuationRequestInformationValidation
  //       .PURPOSE_VALUATION_Id_VALIDATION_MESSAGE ||
  //     this.valuationRequestInformationValidation.DESCRIPTION_MESSAGE ||
  //     this.valuationRequestInformationValidation
  //       .CANCELlATION_DURATION_VALUEATION_DATE
  //   )
  //     this.valuationRequestInformationValidation.isFrist = true;
  //   else this.valuationRequestInformationValidation.isFrist = false;

  //   if (
  //     this.valuationRequestInformationValidation
  //       .OWNERSHIP_NUMBER_VALIDATION_MESSAGE ||
  //     this.valuationRequestInformationValidation.REAL_ESTATE_TYPE_MESSAGE ||
  //     this.valuationRequestInformationValidation.REAL_ESTATE_USAGE_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_LOCATION_X_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_LOCATION_Y_MESSAGE ||
  //     this.valuationRequestInformationValidation.REAL_ESTATE_AREA_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_FULL_ADDRESS_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_COUNTRY_NAME_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_CITY_NAME_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_DISTRICT_NAME_MESSAGE ||
  //     this.valuationRequestInformationValidation.GOOGLE_COUNTRY_EXTRA_MESSAGE
  //   )
  //     this.valuationRequestInformationValidation.isSecond = true;
  //   else this.valuationRequestInformationValidation.isSecond = false;

  //   const containsAngular = Object.keys(error).some((key) =>
  //     key.includes('[1]')
  //   );
  //   this.valuationRequestInformationValidation.isMultiRealestate =
  //     containsAngular;

  //   return this.valuationRequestInformationValidation;
  // }

  goToBack() {
    this.callParrentToGoToPrevStep.emit(undefined);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
