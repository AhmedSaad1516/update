import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatStepper,
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import {
  SharedStepperComponent,
  TitleFormComponent,
} from '@taqeem-workspace/general-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValuationRequestInformationValidation } from '../../individuals-portal/models/valuation-request-information-validation';
import { DoneAddQualificationComponent } from './done-add-qualification/done-add-qualification.component';
import { ChoosingEvaluatorsImageProfileComponent } from './choosing-evaluators-image-profile/choosing-evaluators-image-profile.component';
import { DoneAddCertificationRequestRealestateComponent } from './done-add-certification-request-realestate/done-add-certification-request-realestate.component';
import { EvaluatorsRequestInformationComponent } from './evaluators-request-information/evaluators-request-information.component';
import { OtherAttachmentsComponent } from './other-attachments/other-attachments.component';
@Component({
  selector: 'app-evaluators-portal-request',
  templateUrl: './evaluators-portal-request.component.html',
  styleUrls: ['./evaluators-portal-request.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    CommonModule,
    TitleFormComponent,
    TranslateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    AsyncPipe,
    FlexLayoutModule,
    FlexLayoutServerModule,
    EvaluatorsPortalRequestComponent,
    EvaluatorsRequestInformationComponent,
    DoneAddQualificationComponent,
    ChoosingEvaluatorsImageProfileComponent,
    SharedStepperComponent,
    MatIconModule,
    DoneAddCertificationRequestRealestateComponent,
    OtherAttachmentsComponent
  ],
})
export class EvaluatorsPortalRequestComponent implements OnInit {
  @ViewChild(MatStepper) stepper: MatStepper | any;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thridFormGroup = this._formBuilder.group({
    thridCtrl: ['', Validators.required],
  });

  FourFormGroup = this._formBuilder.group({
    FourCtrl: ['', Validators.required],
  });
  fiveFormGroup = this._formBuilder.group({
    FourCtrl: ['', Validators.required],
  });
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;
  isOneRealEstate: boolean = true;
  appNumber: string = '';
  valuationRequestInformationValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
  count: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    localStorage.setItem('valuationRequestInformation', '{}');
  }

  callParrentToGoToNextStep(e: any): void {
    this.count++;
    if (typeof e == 'boolean') this.isOneRealEstate = e;
    if (typeof e == 'string') this.appNumber = e;
    if (this.count == 1) {
      this.firstFormGroup.get('firstCtrl')?.clearValidators();
      this.firstFormGroup.get('firstCtrl')?.updateValueAndValidity();
    } else if (this.count == 2) {
      this.secondFormGroup.get('secondCtrl')?.clearValidators();
      this.secondFormGroup.get('secondCtrl')?.updateValueAndValidity();
    } else if (this.count == 3) {
      this.thridFormGroup.get('thridCtrl')?.clearValidators();
      this.thridFormGroup.get('thridCtrl')?.updateValueAndValidity();
    } else if (this.count == 4) {
      this.FourFormGroup.get('FourCtrl')?.clearValidators();
      this.FourFormGroup.get('FourCtrl')?.updateValueAndValidity();
    }
    else if (this.count == 5) {
      this.fiveFormGroup.get('FourCtrl')?.clearValidators();
      this.fiveFormGroup.get('FourCtrl')?.updateValueAndValidity();
    }
    this.stepper.next();
  }

  callParrentToGoToPrevStep(e: any): void {
    this.count--;
    if (typeof e?.isFrist == 'boolean') {
      this.valuationRequestInformationValidation = e;
    }
    if (this.count == 1) {
      this.firstFormGroup.get('firstCtrl')?.setValidators(Validators.required);
      this.firstFormGroup.get('firstCtrl')?.updateValueAndValidity();
    } else if (this.count == 2) {
      this.secondFormGroup
        .get('secondCtrl')
        ?.setValidators(Validators.required);
      this.secondFormGroup.get('secondCtrl')?.updateValueAndValidity();
    } else if (this.count == 3) {
      this.thridFormGroup.get('thridCtrl')?.setValidators(Validators.required);
      this.thridFormGroup.get('thridCtrl')?.updateValueAndValidity();
    } else if (this.count == 4) {
      this.FourFormGroup.get('FourCtrl')?.setValidators(Validators.required);
      this.FourFormGroup.get('FourCtrl')?.updateValueAndValidity();
    }
    else if (this.count == 5) {
      this.fiveFormGroup.get('FourCtrl')?.setValidators(Validators.required);
      this.fiveFormGroup.get('FourCtrl')?.updateValueAndValidity();
    }
    this.stepper.previous();
  }
}
