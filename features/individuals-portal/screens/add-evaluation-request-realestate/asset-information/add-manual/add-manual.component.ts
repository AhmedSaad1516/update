import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import {
  CancelButtonComponent,
  InputFieldComponent,
  Lookup,
  RadioButtonComponent,
  SelectFieldComponent,
  SharedButtonComponent,
  SharedMapComponent,
  UploadFileDragComponent,
  ViewMapComponent,
} from '@taqeem-workspace/general-lib';
import { ValuationRequestInformationValidation } from '../../../../models/valuation-request-information-validation';
import { AddEvaluationRequestRealestateService } from '../../../../services/add-evaluation-request-realestate.service';
import { AssetInformation } from './../../../../models/asset-information';
import { ValuationRequestInformation } from './../../../../models/valuation-request-information';
import { realestateTypeList } from '../../../../data/dummy-test-data';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import {
  getRealstateType,
  getrealestateUsage,
} from '../../../lookup-state/lookup.selector';
import {
  RealestatType,
  RealestatUsage,
} from '../../../lookup-state/lookup.actions';
import { fullValuationRequestRealestate } from '../../../state/valuation-request-realestate.actions';
// import { realestateTypeList } from '../../../../data/dummy-test-data';

@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.component.html',
  styleUrls: ['./add-manual.component.scss'],
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
    SharedMapComponent,
    MatDividerModule,
    UploadFileDragComponent,
    FormsModule,
    ReactiveFormsModule,
    ViewMapComponent,
  ],
})
export class AddManualComponent implements OnInit {
  @Input() isOneRealEstate: boolean = true;
  @Input() isShowJusticeReturnData: boolean = true;
  @Input() requestValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
  @Output() childFunctionEvent: EventEmitter<void> = new EventEmitter<void>();

  showBtn: boolean = false;
  radioValue: string = '0';
  assetInformationForm: FormGroup = new FormGroup({});
  assetInformation: AssetInformation[] = [];
  oneAsset!: AssetInformation;
  googleMapAddress!: AssetInformation;
  showProgressBar = true;
  fileToUpload: File[] = [];
  progress = 0;
  valuationRequestInformation: ValuationRequestInformation = JSON.parse(
    localStorage.getItem('valuationRequestInformation')!
  );
  // realestateTypeList: Lookup[] = realestateTypeList;
  // realestateUsageList: Lookup[] = realestateTypeList;
  // realestateTypeList!: Lookup[];
  // realestateUsageList!: Lookup[];

  realestateTypeList!: Observable<Lookup[]>;
  realestateUsageList!: Observable<Lookup[]>;

  showAssetAge: boolean = true;
  fxFlexAreaSize: string = '49';
  counter: number = 0;
  oneRealestateType!: Lookup | undefined;
  oneRealestateUsage!: Lookup | undefined;

  constructor(
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.counter = 0;
    this.initForm();

    this.realestateTypeList = this.store.select(getRealstateType);
    this.store.dispatch(RealestatType());
    this.realestateUsageList = this.store.select(getrealestateUsage);
    this.store.dispatch(RealestatUsage());
    // this.getLookup();
  }

  ngOnChanges() {}

  initForm() {
    this.assetInformationForm = new FormGroup({
      // ownershipNumber: new FormControl('', Validators.required),
      ownershipFilePath: new FormControl('', Validators.required),
      realestateTypeId: new FormControl(null, Validators.required),
      realestateUsageId: new FormControl(null, Validators.required),
      realestateAgeDays: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]),
      realestateArea: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]),
      // googleFullAddress: new FormControl('', Validators.required),

      // return Data Jus
      senderName20: new FormControl({ value: '2727', disabled: true }),
      senderName21: new FormControl({ value: '8109', disabled: true }),
      senderName22: new FormControl({ value: '13321', disabled: true }),
      senderName23: new FormControl({ value: 'انس بن مالك', disabled: true }),
      senderName24: new FormControl({ value: 'حي الصحافة', disabled: true }),
      senderName25: new FormControl({ value: 'الرياض', disabled: true }),
    });
  }

  fullForm() {
    this.assetInformation = [...this.assetInformation];
  }

  addAsset() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
    this.getLookup();
    this.assetInformation = [];
    const applicationValuationOrganizationDTOList =
      this.valuationRequestInformation.realEstateDTOList;
    if (applicationValuationOrganizationDTOList !== undefined) {
      for (
        let i = 0;
        i < applicationValuationOrganizationDTOList!.length;
        i++
      ) {
        this.oneAsset = { ...applicationValuationOrganizationDTOList![i] };
        this.assetInformation.push(this.oneAsset);
      }
    }
    let omer = { address: this.googleMapAddress.googleExtraInfo };
    this.oneAsset = {
      ownershipNumber: localStorage.getItem('assetDeedNumber')
        ? parseInt(localStorage.getItem('assetDeedNumber')!.toString())
        : undefined,
      ownershipFilePath:
        this.assetInformationForm.get('ownershipFilePath')?.value,
      realestateTypeCode:
        this.assetInformationForm.get('realestateTypeId')?.value,
      realestateType: this.oneRealestateType,
      // realestateTypeName: this.realestateTypeList.find(
      //   (item) =>
      //     item.id === this.assetInformationForm.get('realestateTypeId')?.value
      // )?.nameAr,
      realestateUsageCode:
        this.assetInformationForm.get('realestateUsageId')?.value,

      realestateUsage: this.oneRealestateUsage,
      realestateAgeDays:
        this.assetInformationForm.get('realestateAgeDays')?.value,
      realestateArea: this.assetInformationForm.get('realestateArea')?.value,
      // googleFullAddress: this.googleMapAddress.googleFullAddress,
      googleFullAddress: JSON.parse(JSON.stringify(omer)),
      locationX: this.googleMapAddress.locationX,
      locationY: this.googleMapAddress.locationY,
      googleCountryName: this.googleMapAddress.googleCountryName,
      googleCityName: this.googleMapAddress.googleCityName,
      googleDistrictName: this.googleMapAddress.googleDistrictName,
      googleSearchText: this.googleMapAddress.googleSearchText,
      googleExtraInfo: this.googleMapAddress.googleExtraInfo,
    };
    this.assetInformation.push(this.oneAsset);
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
    this.valuationRequestInformation.realEstateDTOList = this.assetInformation;
    localStorage.setItem(
      'valuationRequestInformation',
      JSON.stringify(this.valuationRequestInformation)
    );
    this.store.dispatch(
      fullValuationRequestRealestate({
        valuationRequestInformation: this.valuationRequestInformation,
      })
    );
    this.childFunctionEvent.emit();
  }

  getLookup() {
    this.realestateTypeList
      .pipe(
        map((objects) =>
          objects.find(
            (obj) =>
              obj.code ===
              this.assetInformationForm.get('realestateTypeId')?.value
          )
        )
      )
      .subscribe((obj) => {
        this.oneRealestateType = obj;
      });

    this.realestateUsageList
      .pipe(
        map((objects) =>
          objects.find(
            (obj) =>
              obj.code ===
              this.assetInformationForm.get('realestateUsageId')?.value
          )
        )
      )
      .subscribe((obj) => {
        this.oneRealestateUsage = obj;
      });
  }

  getFormGroup(contralName: string): FormControl {
    return this.assetInformationForm?.get(contralName) as FormControl;
  }

  onFileSelected(event: File[]) {
    this.fileToUpload = event;
    this.assetInformationForm.get('ownershipFilePath')?.setValue(event[0].name);
  }

  getLocation(event: any) {
    const address_components = event.address.address_components;
    this.googleMapAddress = {
      googleFullAddress: event,
      locationX: event.lat,
      locationY: event.long,
      googleCountryName: address_components.find(
        (item: { types: any }) => item.types[0] === 'country'
      ).long_name,
      googleCityName: address_components.find(
        (item: { types: any }) => item.types[0] === 'locality'
      ).long_name,
      googleDistrictName: address_components.find(
        (item: { types: any }) => item.types[1] === 'sublocality'
      ).long_name,
      googleRegionName: address_components.find(
        (item: { types: any }) =>
          item.types[0] === 'administrative_area_level_1'
      ).long_name,
      googleStreetName: address_components.find(
        (item: { types: any }) => item.types[0] === 'route'
      )
        ? address_components.find(
            (item: { types: any }) => item.types[0] === 'route'
          ).long_name
        : '',
      googleStreetNumber: address_components.find(
        (item: { types: any }) => item.types[0] === 'street_number'
      )
        ? address_components.find(
            (item: { types: any }) => item.types[0] === 'street_number'
          ).long_name
        : '',
      googlePostalCode: address_components.find(
        (item: { types: any }) => item.types[0] === 'postal_code'
      )
        ? address_components.find(
            (item: { types: any }) => item.types[0] === 'postal_code'
          ).long_name
        : '',
      googleBuildingNumber: address_components.find(
        (item: { types: any }) => item.types[0] === 'premise'
      )
        ? address_components.find(
            (item: { types: any }) => item.types[0] === 'premise'
          ).long_name
        : '',

      googleSearchText: address_components.find(
        (item: { types: any }) => item.types[0] === 'premise'
      )
        ? address_components.find(
            (item: { types: any }) => item.types[0] === 'premise'
          ).long_name
        : '',
      googleExtraInfo: event.address.formatted_address,
    };
  }

  hideShowAssetAge() {
    if (this.assetInformationForm.get('realestateTypeId')?.value === 5) {
      this.showAssetAge = false;
      this.fxFlexAreaSize = '100';
    } else {
      this.showAssetAge = true;
      this.fxFlexAreaSize = '49';
    }
  }
}
