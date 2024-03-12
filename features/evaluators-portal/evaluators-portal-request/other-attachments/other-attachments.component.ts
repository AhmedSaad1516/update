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
  TextAreaComponent,
} from '@taqeem-workspace/general-lib';
import { RequestDTO } from '../../../individuals-portal/models/request-DTO';
import { ValuationRequestInformationValidation } from '../../../individuals-portal/models/valuation-request-information-validation';
import { ValuationRequestInformation } from '../../../individuals-portal/models/valuation-request-information';
import { AddEvaluationRequestRealestateService } from '../../../individuals-portal/services/add-evaluation-request-realestate.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../../../shared/components/custom-alert/custom-alert.component';
import { AutoComplete } from '../../../../shared/components/forms/auto-complete/auto-complete.component';
import { SharedMapComponent } from '../../../../shared/components/shared-map/shared-map.component';
import { UploadFileDragComponent } from '../../../../shared/components/forms/upload-file-drag/upload-file-drag.component';

@Component({
  selector: 'app-other-attachments',
  templateUrl: './other-attachments.component.html',
  styleUrls: ['./other-attachments.component.scss'],
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
    UploadFileDragComponent

  ],
})
export class OtherAttachmentsComponent implements OnInit {
  @Output() callParrentToGoToNextStep: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
  @Input() requestValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
    radios: Lookup[] = [
      { id: 1, nameAr: 'نعم', hintAr: '' },
      { id: 2, nameAr: 'لا', hintAr: '' },
    ];
  radioValue: number = 1;

  infoEvaluationForm!: FormGroup;
  valuationRequestInformation!: ValuationRequestInformation;
  requestDTO!: RequestDTO;
  purposeValuationList!: Lookup[];
  // infoEvaluationResponse: any;
  responseSuccess: boolean = false;
  nonSaudi :boolean=false;
  constructor(
    private fb: FormBuilder,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    private router: Router,
    public dialog: MatDialog

  ) {}

  ngOnInit() {
    this.initForm();
    // this.getLookup();
    if(this.responseSuccess==true){
      this.infoEvaluationForm.controls['FirstNameAr'].disable();
      this.infoEvaluationForm.controls['SecondNameAr'].disable();
      this.infoEvaluationForm.controls['GrandfatherNameAr'].disable();
      this.infoEvaluationForm.controls['LastNameAr'].disable();
      this.infoEvaluationForm.controls['street'].disable();
      this.infoEvaluationForm.controls['street'].disable();
    }
  }

  initForm() {
    this.infoEvaluationForm = new FormGroup({
      isDynamic: new FormControl(1, [
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]),
      FirstNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      SecondNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      GrandfatherNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      LastNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      FirstNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      SecondNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      GrandfatherNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      LastNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      valuationTitle: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      purposeValuationId: new FormControl(1, [
        Validators.required,
        Validators.pattern('^\\d*$'),
      ]),
      cancellationDurationValuationDate: new FormControl(
        '',
        Validators.required
      ),
      street: new FormControl(
        '',
        Validators.required
      ),
      isOneAsset: new FormControl(true, Validators.required),
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
//     this.callParrentToGoToNextStep.emit(
//       this.infoEvaluationForm.get('isOneAsset')?.value
// );
this.callParrentToGoToNextStep.emit();
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
   
  }

  onCodeCompleted(code: string) {
 
  }
  changeRadio() {
    setTimeout(() => {
     console.log('-------------------');
     this.radioValue =
     this.infoEvaluationForm.get('isDynamic')?.value;
   console.log(this.radioValue);
   if (this.radioValue == 1) {
    this.nonSaudi=false
    }
   if (this.radioValue == 2) {
   this.nonSaudi=true
   }
    }, 10);
  }



}
