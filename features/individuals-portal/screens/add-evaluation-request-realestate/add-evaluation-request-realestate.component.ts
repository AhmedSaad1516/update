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
import { ValuationRequestInformationValidation } from '../../models/valuation-request-information-validation';
import { AssetInformationComponent } from './asset-information/asset-information.component';
import { ChoosingSpecificValuationOrganizationComponent } from './choosing-specific-valuation-organization/choosing-specific-valuation-organization.component';
import { DoneAddEvaluationRequestRealestateComponent } from './done-add-evaluation-request-realestate/done-add-evaluation-request-realestate.component';
import { ValuationRequestInformationComponent } from './valuation-request-information/valuation-request-information.component';
import { ReviewAddEvaluationRequestRealestateComponent } from './review-add-evaluation-request-realestate/review-add-evaluation-request-realestate.component';
@Component({
  selector: 'app-add-evaluation-request-realestate',
  templateUrl: './add-evaluation-request-realestate.component.html',
  styleUrls: ['./add-evaluation-request-realestate.component.scss'],
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
    ValuationRequestInformationComponent,
    AssetInformationComponent,
    ChoosingSpecificValuationOrganizationComponent,
    SharedStepperComponent,
    MatIconModule,
    DoneAddEvaluationRequestRealestateComponent,
    ReviewAddEvaluationRequestRealestateComponent,
  ],
})
export class AddEvaluationRequestRealestateComponent implements OnInit {
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

  FiveFormGroup = this._formBuilder.group({
    FiveCtrl: ['', Validators.required],
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
    this.stepper.previous();
  }
}
