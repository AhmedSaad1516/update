import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangeDirService } from '../../../services/change-dir.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { Lookup } from '../../../../features/individuals-portal/models/lookup';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslateModule,
    MatTooltipModule,
  ],
  providers: [ChangeDirService],
})
export class RadioButtonComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() isDisabled: boolean = false;
  @Input() radios: Lookup[] = [];
  @Input() controlF: FormControl = new FormControl();
  @Output() radioChange: EventEmitter<string> = new EventEmitter<string>();
  omer: number = 0;

  @Input() validators: [] = [];
  radiosLength: number = 0;

  matcher = new MyErrorStateMatcher();
  isRequiredValidator: boolean = false;
  lang: string = 'en';

  constructor(private langService: ChangeDirService) {}

  ngOnInit() {
    if (this.controlF instanceof FormControl && this.validators) {
      this.validators.forEach(
        (validator: ValidatorFn | ValidatorFn[] | null) => {
          this.controlF?.setValidators(validator);
        }
      );
    }
    this.controlF.patchValue(this.controlF.value);
    if (this.radios !== undefined) this.radiosLength = this.radios.length;
    else this.radiosLength = 0;
    this.isRequiredValidator = this.isRequired();
    this.lang = this.langService.langStorage;
  }
  @Input() backendError: string = '';

  getErrorMessages(): string[] | null {
    const errorMessages: string[] = [];

    if (this.controlF?.hasError('required')) {
      errorMessages.push('This field is required');
    }

    if (this.controlF?.hasError('pattern')) {
      errorMessages.push('Invalid pattern');
    }
    if (this.backendError) {
      errorMessages.push(this.backendError);
    }

    return errorMessages.length > 0 ? errorMessages : null;
  }

  handleClick(): void {
    this.radioChange.emit();
  }

  isRequired() {
    return this.controlF.validator
      ? !!this.controlF.validator(this.controlF)
      : false;
  }

  // getFloatLabelValue(): FloatLabelType {
  //   return this.floatLabelControl.value || 'auto';
  // }
}
