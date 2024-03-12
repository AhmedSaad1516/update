import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Option } from '../../../../shared/Models/option';
import { AutoComplete } from '../../../../shared/components/forms/auto-complete/auto-complete.component';
import { CancelButtonComponent } from '../../../../shared/components/forms/cancel-button/cancel-button.component';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { RadioButtonComponent } from '../../../../shared/components/forms/radio-button/radio-button.component';
import { SelectFieldComponent } from '../../../../shared/components/forms/select-field/select-field.component';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { TextAreaComponent } from '../../../../shared/components/forms/text-area/text-area.component';
import { TitleFormComponent } from '../../../../shared/components/forms/title-form/title-form.component';
import { MyErrorStateMatcher } from '../checkbox/checkbox.component';
import { SelectFieldWithImgComponent } from '../select-field-with-img/select-field-with-img.component';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    SharedButtonComponent,
    InputFieldComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    DatePickerComponent,
    TitleFormComponent,
    InputFieldComponent,
    SelectFieldComponent,
    SharedButtonComponent,
    TextAreaComponent,
    RadioButtonComponent,
    CancelButtonComponent,
    TranslateModule,
    AutoComplete,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    SelectFieldWithImgComponent,
  ],
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.scss',
})
export class InputGroupComponent {
  show = false;

  @Input() inputLabel: string = '';
  @Input() optionsLabel: string = '';
  @Input() error: string = '';
  @Input() inputPlaceholder: string = '';
  @Input() optionsPlaceholder: string = '';
  @Input() hint: string = '';
  @Input() type: string = 'text';
  @Input() isDisabled: boolean = false;
  @Input() imageCode: string = '';
  // @Input() controlF: FormControl | any = new FormControl();

  @Input() controlF: FormControl | AbstractControl<any, any> | any =
    new FormControl();
  @Input() optionscontrolF: FormControl | AbstractControl<any, any> | any =
    new FormControl();
  @Input() validators: ValidatorFn[] | null = null;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorChange: EventEmitter<string> = new EventEmitter<string>();
  matcher = new MyErrorStateMatcher();
  @Input() options: Option[] | any = [];
  @Input() id: string = '';

  constructor(private TranslateService: TranslateService) {}

  ngOnInit() {
    this.isValidCode(this.imageCode);
  }
  isValidCode(result: any) {
    // console.log(result, this.controlF?.value);

    const imageCodeValue = this.controlF?.value;
    const isImageCodeTouched = this.controlF?.touched;
    if (
      result !== imageCodeValue &&
      result.length > 3 &&
      imageCodeValue !== null &&
      imageCodeValue.length !== 0
    ) {
      console.log(result, imageCodeValue);
      return true;
    }
    if (this.controlF?.value == null || this.controlF?.value.length == 0) {
      return false;
    }
    return false;
  }
  isRequired() {
    return this.controlF.validator
      ? !!this.controlF.validator(this.controlF)
      : false;
  }
  getOptionLabel() {
    const selectedOption = this.options.find(
      (option: { id: any }) => option.id === this.controlF.value
    );
    return selectedOption ? selectedOption.name : '';
  }
}
