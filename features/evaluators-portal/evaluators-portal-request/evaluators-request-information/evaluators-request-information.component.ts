import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputValidation } from '../../../../shared/utils/InputValidation';
import { CodeInputModule } from 'angular-code-input';
import { Observable, map } from 'rxjs';

import {
  CancelButtonComponent,
  CheckboxComponent,
  DatePickerComponent,
  InputFieldComponent,
  Lookup,
  RadioButtonComponent,
  SelectFieldComponent,
  SharedButtonComponent,
  SharedCKEditor,
  SharedMapComponent,
  TextAreaComponent,
  ViewMapComponent,
} from '@taqeem-workspace/general-lib';

import { RequestDTO } from '../../../individuals-portal/models/request-DTO';
import { ValuationRequestInformationValidation } from '../../../individuals-portal/models/valuation-request-information-validation';
import { ValuationRequestInformation } from '../../../individuals-portal/models/valuation-request-information';
import { AddEvaluationRequestRealestateService } from '../../../individuals-portal/services/add-evaluation-request-realestate.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../../../shared/components/custom-alert/custom-alert.component';
import { AutoComplete } from '../../../../shared/components/forms/auto-complete/auto-complete.component';
import { UploadFileDragComponent } from '../../../../shared/components/forms/upload-file-drag/upload-file-drag.component';
import { GenericEvaluatorsService } from '../../../../shared/services/generic-evaluators.service';
import { MockDataService } from '../../mock-data.service';
import { NationalAddressReq, NationalAddressRequest, NationalAddressRes } from '../../../auth/Models/national-addres';
import { AssetInformation } from '../../../individuals-portal/models/asset-information';
import { UserApplicationMockService } from '../services/user-application.mock.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';

@Component({
  selector: 'app-evaluators-request-information',
  templateUrl: './evaluators-request-information.component.html',
  styleUrls: ['./evaluators-request-information.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    CustomAlertComponent,
    AutoComplete,
    SharedMapComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    SelectFieldComponent,
    SharedButtonComponent,
    TextAreaComponent,
    RadioButtonComponent,
    CancelButtonComponent,
    TranslateModule,
    FormsModule,
    CodeInputModule,
    ReactiveFormsModule,
    CheckboxComponent,
    SharedCKEditor,
    DatePickerComponent,
    UploadFileDragComponent,
    ViewMapComponent
  ],
})
export class EvaluatorsRequestInformationComponent implements OnInit {
  @Output() callParrentToGoToNextStep: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
  @Input() requestValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
    radios: Lookup[] = [
      { id: 1, nameAr: 'نعم', hintAr: '' ,code:'1'},
      { id: 2, nameAr: 'لا', hintAr: '' ,code:'2'},
    ];
  radioValue: string = '1';
  googleMapAddress!: AssetInformation;
  infoEvaluationForm!: FormGroup;
  valuationRequestInformation!: ValuationRequestInformation;
  requestDTO!: RequestDTO;
  purposeValuationList!: Lookup[];
  // infoEvaluationResponse: any;
  responseSuccess: boolean = false;
  nonSaudi :boolean=false;
  nationalAddressData: any;
  shortAddressCode:any;
  userData : any;
  allUserData:any;
  loader:boolean=true;
  constructor(
    private fb: FormBuilder,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    private genericEvaluatorsService: GenericEvaluatorsService,
    private router: Router,
    public dialog: MatDialog,
    private mockDataService: MockDataService,
    private userApplicationMockService :UserApplicationMockService,
    private SpinnerService: SpinnerService,
    private sharedStateService: SharedStateService,

  ) {}

  ngOnInit() {
  this.getAllData()
    // this.initForm();
    // this.getLookup();
    // if(this.responseSuccess==true){
    //   this.infoEvaluationForm.controls['FirstNameAr'].disable();
    //   this.infoEvaluationForm.controls['SecondNameAr'].disable();
    //   this.infoEvaluationForm.controls['GrandfatherNameAr'].disable();
    //   this.infoEvaluationForm.controls['LastNameAr'].disable();
    //   this.infoEvaluationForm.controls['street'].disable();
    //   this.infoEvaluationForm.controls['street'].disable();
    // }

  }
  getAllData(){
  this.userData=this.userApplicationMockService.userDecodeJWT()
  console.log('user--data-',this.userData);
  this.getUserApplicationData()
  console.log('---allUserData-----',this.allUserData);
this.getNationalAddress()
 
}
  initForm(data: any) {
    this.infoEvaluationForm = new FormGroup({
      // isDynamic: new FormControl(data.isDynamic || 1, [Validators.required, Validators.pattern('^\\d*$')]),
      FirstNameAr: new FormControl(this.userData.given_name || null, [Validators.required, Validators.pattern(InputValidation.ArabicRegx)]),
      SecondNameAr: new FormControl(this.userData.family_name || null, [Validators.required, Validators.pattern(InputValidation.ArabicRegx)]),
      GrandfatherNameAr: new FormControl(this.userData.GrandfatherNameAr || null, [Validators.required, Validators.pattern(InputValidation.ArabicRegx)]),
      LastNameAr: new FormControl(this.userData.LastNameAr || null, [Validators.required, Validators.pattern(InputValidation.ArabicRegx)]),
      FirstNameEn: new FormControl(this.userData.FirstNameEn || null, [Validators.required, Validators.pattern(InputValidation.EnglishRegx)]),
      SecondNameEn: new FormControl(this.userData.SecondNameEn || null, [Validators.required, Validators.pattern(InputValidation.EnglishRegx)]),
      GrandfatherNameEn: new FormControl(this.userData.GrandfatherNameEn || null, [Validators.required, Validators.pattern(InputValidation.EnglishRegx)]),
      LastNameEn: new FormControl(this.userData.LastNameEn || null, [Validators.required, Validators.pattern(InputValidation.EnglishRegx)]),
      // valuationTitle: new FormControl(data.valuationTitle || '', Validators.required),
      nationalNumInputs: new FormControl(this.userData.iat || null, Validators.required),
      street: new FormControl(data.street || '', Validators.required),
      shortAddress: new FormControl(data.shortAddress || '', Validators.required),
      buildingNumber: new FormControl(data.buildingNumber || '', Validators.required),
      subNumber: new FormControl(data.subNumber || '', Validators.required),
      postalCode: new FormControl(data.postalCode || '', Validators.required),
      district: new FormControl(data.district || '', Validators.required),
      city: new FormControl(data.city || '', Validators.required),
      country: new FormControl(data.country || '', Validators.required),
      isOneAsset: new FormControl(data.isOneAsset || true, Validators.required),
    });
  }

  fullForm() {
    // this.requestDTO = {
    //   valuationTitle: this.infoEvaluationForm.get('valuationTitle')?.value,
    //   purposeValuationId: this.infoEvaluationForm.get('purposeValuationId')
    //     ?.value
    //     ? parseInt(this.infoEvaluationForm.get('purposeValuationId')?.value)
    //     : 0,
    //   applicationType: 'Evaluation',
    //   customerId: 232323,
    //   cancellationDurationValuationDate: this.infoEvaluationForm.get(
    //     'cancellationDurationValuationDate'
    //   )?.value,
    //   description: this.infoEvaluationForm.get('description')?.value,
    // };
    // this.valuationRequestInformation = {
    //   applicationRequestDTO: this.requestDTO,
    // };
    // localStorage.setItem(
    //   'valuationRequestInformation',
    //   JSON.stringify(this.valuationRequestInformation)
    // );
    // this.callParrentToGoToNextStep.emit();

    // this.infoEvaluationForm.get('isDynamic')?.value === '1'

    // let body = {
    //   attachmentIds: [],
    //     shortAddress: this.infoEvaluationForm.get('shortAddress')?.value,
    //     buildingNumber: this.infoEvaluationForm.get('buildingNumber')?.value,
    //     street: this.infoEvaluationForm.get('street')?.value,
    //     subNumber: this.infoEvaluationForm.get('subNumber')?.value,
    //     district: this.infoEvaluationForm.get('district')?.value,
    //     postalCode: this.infoEvaluationForm.get('postalCode')?.value,
    //     city: this.infoEvaluationForm.get('city')?.value,
    //     country: this.infoEvaluationForm.get('country')?.value,
    // };
    // console.log('login - body', body);
    // this.genericEvaluatorsService
    //   .post<NationalAddressRequest>('national-address', body)
    //   .subscribe(
    //     (data) => {
    //       this.nationalAddressData = data;
    //       this.callParrentToGoToNextStep.emit();
    //     },
    //     (error) => {
    //       console.log(error.error.error.errorCode);
    //     }
    //   );
    const allUserData ={
      userData:this.userData,
      allUserData:this.allUserData
    }
    this.sharedStateService.setData(allUserData);

    let body = {
      shortAddress: this.googleMapAddress.googleExtraInfo,
      buildingNumber: this.googleMapAddress.googleBuildingNumber,
      street: this.googleMapAddress.googleStreetName,
      subNumber: this.googleMapAddress.googleStreetNumber,
      district: this.googleMapAddress.googleDistrictName,
      postalCode: this.googleMapAddress.googlePostalCode,
      city: this.googleMapAddress.googleCityName,
      country:  this.googleMapAddress.googleCountryName
    };
    console.log('--- body', body);
  
    this.genericEvaluatorsService
      .post<NationalAddressRequest>('national-address', body)
      .subscribe(
        (data) => {
          console.log('national add success---',data);
          this.callParrentToGoToNextStep.emit();
        },
        (error) => {
          if(error){
          }
        }
      );
  }

  getFormGroup(contralName: string): FormControl {
    return this.infoEvaluationForm?.get(contralName) as FormControl;
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  getLookup(): Lookup[] {
    this.addEvaluationRequestRealestateService
      .getPurposeValuationLookup()
      .subscribe(
        async (response: any) => {
          this.purposeValuationList = await response;
        },
        (error: Error) => {
          console.log(error);
        }
      );
    return this.purposeValuationList;
  }

  onCodeChanged(code: string) {
   console.log('----code--',code);
  }

  onCodeCompleted(code: string) {
 
  }
  changeRadio() {
    setTimeout(() => {
     console.log('-------------------');
     this.radioValue =
     this.infoEvaluationForm.get('isDynamic')?.value;
   console.log(this.radioValue);
   if (this.radioValue == '1') {
    this.nonSaudi=false
    }
   if (this.radioValue == '2') {
   this.nonSaudi=true
   }
    }, 10);
  }

  getLocation(event: any) {
    const address_components = event.address.address_components;
    this.googleMapAddress = {
      googleFullAddress: event,
      locationX: event.lat,
      locationY: event.long,
      googleCountryName: this.getAddressComponent(address_components, 'country'),
      googleCityName: this.getAddressComponent(address_components, 'locality'),
      googleDistrictName: this.getAddressComponent(address_components, 'sublocality'),
      googleRegionName: this.getAddressComponent(address_components, 'administrative_area_level_1'),
      googleStreetName: this.getAddressComponent(address_components, 'route'),
      googleStreetNumber: this.getAddressComponent(address_components, 'street_number'),
      googlePostalCode: this.getAddressComponent(address_components, 'postal_code'),
      googleBuildingNumber: this.getAddressComponent(address_components, 'premise'),
      googleSearchText: this.getAddressComponent(address_components, 'premise'),
      googleExtraInfo: event.address.formatted_address,
    };
  }
  
  getAddressComponent(addressComponents: any[], type: string): string {
    const component = addressComponents.find((item: { types: any }) => item.types[0] === type);
    return component ? component.long_name : '';
  }

  addManually(){
    this.responseSuccess=false
  }

  getUserApplicationData(): void {
    // this.userApplicationMockService.getUserApplication().subscribe((data) => {
    //   this.allUserData = data;
    // });

    this.genericEvaluatorsService.get<any>('user-application').subscribe(
      (data) => {
      this.allUserData = data;
      },
      (error) => {
        this.responseSuccess=false;
        this.loader=false;
      }
    );
  }
  // getNationalAddress(){
  //   this.loader=true
  //   setTimeout(() => {
  //     this.nationalAddressData = this.allUserData.data.addresses[0]
  //     console.log('---nationalAddressData-----',this.nationalAddressData.street);
  //     if(this.nationalAddressData){
  //       this.initForm(this.nationalAddressData); 
  //       this.infoEvaluationForm.disable();
  //       this.responseSuccess=false;
  //       this.loader=false;
  //       console.log('---formData-----');
  //     }
  //     else{
  //       this.initForm(this.nationalAddressData); 
  //       this.responseSuccess=false;
  //       this.loader=false;
  //     }
  //   }, 3000);
  // }

  getNationalAddress() {
     this.genericEvaluatorsService.get<any>('user-application').subscribe(
      (data) => {
        this.loader=true
        setTimeout(() => {
          this.nationalAddressData = data.addresses[0]
          console.log('---nationalAddressData-----',this.nationalAddressData.street);
          if(this.nationalAddressData){
            this.initForm(this.nationalAddressData); 
            this.infoEvaluationForm.disable();
            this.responseSuccess=false;
            this.loader=false;
            console.log('---formData-----');
          }
          // else{
          //   this.initForm(this.nationalAddressData); 
          //   this.responseSuccess=false;
          //   this.loader=false;
          // }
        }, 3000);
      },
      (error) => {
        this.initForm(false); 
        this.responseSuccess=false;
        this.loader=false;
      }
    );
  }
}
