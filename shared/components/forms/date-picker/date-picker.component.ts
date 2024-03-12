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


import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {
  displayFormat: any;
  // Override any methods or properties as needed

  // Example: Override format() method to display dates in a specific format
  override format(date: Date, displayFormat: Object): string {
    const formatOptions = {
      gregorian: 'YYYY-MM-DD', // Format for Gregorian dates
      hijri: 'iYYYY-iMM-iDD', // Format for Hijri dates
    };

    const dateMoment = moment(date);

    if (displayFormat === 'gregorian') {
      return dateMoment.format(formatOptions.gregorian);
    } else if (displayFormat === 'hijri') {
      return dateMoment.format(formatOptions.hijri);
    }

    // If displayFormat is not specified or unknown, fallback to the default format
    return super.format(date, displayFormat);
  }
  
}
@Component({
  selector: 'app-date-picker',
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
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Replace 'en-US' with the desired locale
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
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

  constructor(private dateAdapter: DateAdapter<any>) {}
  ngOnInit() {
    // console.log(this.dateType);
      this.dateAdapter.setLocale(this.dateType);

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
