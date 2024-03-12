
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';


import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter , MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxAngularMaterialHijriAdapterModule } from 'ngx-angular-material-hijri-adapter';

import { NgxAngularMaterialHijriAdapterService, DateLocaleKeys, MOMENT_HIJRI_DATE_FORMATS } from 'ngx-angular-material-hijri-adapter';

@Component({
  selector: 'app-hijri-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTooltipModule,
    MatIconModule,
    NgxAngularMaterialHijriAdapterModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
    },
    // Change the format by using `MOMENT_HIJRI_DATE_FORMATS` for Dates and `MOMENT_HIJRI_DATE_TIME_FORMATS` for date/time.
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_HIJRI_DATE_FORMATS },
    // Change the localization to arabic by using `AR_SA` not `AR` only and `EN_US` not `EN` only.
    { provide: MAT_DATE_LOCALE, useValue: DateLocaleKeys.AR_SA },
    NgxAngularMaterialHijriAdapterService
  ],
  templateUrl: './hijri-date-picker.component.html',
  styleUrl: './hijri-date-picker.component.scss'
})
export class HijriDatePickerComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() type: string = 'text';
  @Input() isDisabled: boolean = false;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() control: FormControl | AbstractControl<any, any> | any;
  @Input() validators: ValidatorFn[] | null = null;
  @Input() controlF: FormControl | AbstractControl<any, any> | any;
  @Input() dateType: string = 'en';
  @Input() id: string = '';
  isRequiredValidator: boolean = false;

  constructor(private dateAdapter: DateAdapter<any> , 
    private hijriDateAdapter: NgxAngularMaterialHijriAdapterService,

    ) {}
  ngOnInit() {
    // console.log(this.dateType);
      this.dateAdapter.setLocale(this.dateType);
      this.hijriDateAdapter?.setLocale(this.dateType === DateLocaleKeys.AR ? DateLocaleKeys.AR_SA : DateLocaleKeys.EN_US);

    if (this.control instanceof FormControl && this.validators) {
      this.validators.forEach((validator) => {
        this.control?.setValidators(validator);
      });
    }
    this.controlF.patchValue(this.controlF.value);
    this.isRequiredValidator = this.isRequired();
  }
  getErrorMessage(): string | null {
    if (this.control?.hasError('required')) {
      return 'This field is required';
    }
    // Add more error messages based on your validation requirements
    return null;
  }
  isRequired() {
    return this.controlF.validator
      ? !!this.controlF.validator(this.controlF)
      : false;
  }
}
