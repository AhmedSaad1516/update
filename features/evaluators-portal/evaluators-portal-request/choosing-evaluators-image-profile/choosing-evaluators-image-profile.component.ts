import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output ,ViewChild,TemplateRef, ElementRef, AfterViewInit} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChoosingValuationOrganization } from '../../../individuals-portal/models/choosing-valuation-organization';
import { ValuationOrganization } from '../../../individuals-portal/models/valuation-organization';
import { AddEvaluationRequestRealestateService } from '../../../individuals-portal/services/add-evaluation-request-realestate.service';

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
import { ValuationRequestInformation } from '../../../individuals-portal/models/valuation-request-information';
import { ValuationRequestInformationValidation } from '../../../individuals-portal/models/valuation-request-information-validation';
import { DoneAddCertificationRequestRealestateComponent } from '../done-add-certification-request-realestate/done-add-certification-request-realestate.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AddImageProfileComponent } from './add-image-profile/add-image-profile.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropComponent } from './add-image-profile/image-crop/image-crop.component';
import { GenericEvaluatorsService } from '../../../../shared/services/generic-evaluators.service';


@Component({
  selector: 'app-choosing-evaluators-image-profile',
  templateUrl:'./choosing-evaluators-image-profile.component.html',
  styleUrls: ['./choosing-evaluators-image-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    AddImageProfileComponent,
    MatCardModule,
    MatDialogModule,
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
    DoneAddCertificationRequestRealestateComponent,
    AlertComponent,
  ],
})
export class ChoosingEvaluatorsImageProfileComponent implements OnInit ,AfterViewInit {
  sanitizeImagePreview:any;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @Output() callParrentToGoToNextStep: EventEmitter<string> =
    new EventEmitter<string>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
    loader:boolean=true;

  radios: Lookup[] = [
    { id: 1, nameAr: 'لا، اختيار المنشأة تلقائياً', hintAr: '' },
    { id: 2, nameAr: 'نعم، اختيار المنشأة يدوياً', hintAr: '' },
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
  radioValue: number = 1;
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
  selectedImage: string | null = 'assets/img/defult_profile_img.png';
  zoomLevel = 1;
  zoomValue: number = 1;
  min=1;
  max=5;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
   lang :any = localStorage.getItem('lang')
  outputImageAfterZoom: string=''
  profilePictureData:any;
  responseSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    private dialog: MatDialog,
    private router: Router,
    private genericEvaluatorsService: GenericEvaluatorsService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
    
  }

  initForm() {
    this.choosingValuationOrganizationForm = new FormGroup({
      isDynamic: new FormControl(1, [
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]),
      automaticSelectionOfferDuration: new FormControl(''),
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
  }

  submitForm() {
    this.callParrentToGoToNextStep.emit();
  }

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
      console.log(this.radioValue);
      if (this.radioValue === 2) {
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

  // openDialog() {
  //   this.callParrentToGoToNextStep.emit(undefined);
  //   // this.router.navigate(['home']);
  //   // let dialogRef = this.dialog.open(
  //   //   DoneAddCertificationRequestRealestateComponent,
  //   //   { data: { appNumber: this.appNumber } }
  //   // );
  //   // dialogRef.afterClosed().subscribe((result) => {});
  // }

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

  goToBack() {
    this.callParrentToGoToPrevStep.emit();
  }

  goToHome() {
    this.router.navigate(['home']);
  }


  openDialog() {
    this.dialog.open(this.dialogTemplate)
        .afterClosed()
        .subscribe((event) => {
          this.sanitizeImagePreview = event.__zone_symbol__value.objectUrl;
          console.log('event', event);
          console.log('this.sanitizeImagePreview', this.sanitizeImagePreview);
        });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    fileSelector.click();
  }



  changeImage() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    fileSelector.click();
  }

  deleteImage() {
    this.selectedImage = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
 

  zoomIn() {
    this.zoomValue += 0.1;
    this.max+=.5;
  }

  zoomOut() {
    if (this.zoomValue > 0.1) {
      this.zoomValue -= 0.1;
      this.min-=.5;
    }
  }
  ngAfterViewInit() {
    console.log('ddddddddddddddddddddddddddddddddd',this.sanitizeImagePreview);
    // this.saveImage()
  }
  saveImage() {
    const imageElement: HTMLImageElement = this.fileInput.nativeElement.previousElementSibling as HTMLImageElement;
    const containerElement: HTMLElement = this.fileInput.nativeElement.parentElement as HTMLElement;

    // const containerWidth = containerElement.offsetWidth;
    const containerWidth = 160;
    const containerHeight = 160;

    const imageWidth = 160;
    const imageHeight = 160;

    const scaleX = imageWidth / containerWidth;
    const scaleY = imageHeight / containerHeight;

    const offsetX = (containerWidth - imageWidth) / 2;
    const offsetY = (containerHeight - imageHeight) / 2;

    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    const context = canvas.getContext('2d');

    if (context) { 
      context.drawImage(
        imageElement,
        offsetX * scaleX,
        offsetY * scaleY,
        imageWidth * scaleX,
        imageHeight * scaleY,
        0,
        0,
        containerWidth,
        containerHeight
      );

      this.outputImageAfterZoom = canvas.toDataURL('image/jpeg');
    }
  }

  // onImageChange(event:any) {
  //   if (!event.target.files.length) return;
  //   const file = event.target.files[0];
  //   this.dialog
  //     .open(ImageCropComponent, { data: { file } })
  //     .afterClosed()
  //     .subscribe(
  //       (event: ImageCroppedEvent) => (this.sanitizeImagePreview = event.base64)
  //     );
  //   console.log('event',event);
  //   console.log('ddddddddddddddddddddddddddddddddd',this.sanitizeImagePreview);

  // }

  // onImageChange(event: any) {
  //   if (!event.target.files.length) return;
  //   const file = event.target.files[0];
  //   this.dialog
  //     .open(ImageCropComponent, { data: { file } })
  //     .afterClosed()
  //     .subscribe((event) => {
  //       this.sanitizeImagePreview = event.__zone_symbol__value.objectUrl;
  //       console.log('event', event);
  //       console.log('this.sanitizeImagePreview', this.sanitizeImagePreview);
  //     });
  // }

  getProfilePicture() {
    this.genericEvaluatorsService.get<any>('profile-picture/all').subscribe(
     (data) => {
       this.loader=true
       setTimeout(() => {
         this.profilePictureData = data
         if(this.profilePictureData){
           this.responseSuccess=false;
           this.loader=false;
         }
       }, 3000);
     },
     (error) => {
       this.responseSuccess=false;
       this.loader=false;
     }
   );
 }
}
