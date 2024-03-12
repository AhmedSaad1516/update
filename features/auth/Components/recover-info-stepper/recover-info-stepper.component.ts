import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { NationalAddressComponent } from './national-address/national-address.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  StepperOrientation,
  MatStepperModule,
  MatStepper,
} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recover-info-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    SharedButtonComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PersonalInfoComponent,
    NationalAddressComponent,
    MatCardModule,
    MatDividerModule,
    AsyncPipe,
    TranslateModule
  ],
  templateUrl: './recover-info-stepper.component.html',
  styleUrl: './recover-info-stepper.component.scss',
})
export class RecoverInfoStepperComponent {
  @ViewChild(MatStepper) stepper: MatStepper | any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  callParrentToGoToNextStep(e: any): void {
    console.log(e);
    this.stepper.next();
  }

  callParrentToGoToPrevStep(e: any): void {
    console.log(e);
    this.stepper.previous();
  }
}
