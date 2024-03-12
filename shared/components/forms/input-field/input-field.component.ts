import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output , Renderer2} from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  Validators,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';




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
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class InputFieldComponent implements OnInit {
  show = false;
  @Input() label: string = '';
  @Input() error: string = '';
  @Input() class: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() type: string = 'text';
  @Input() suffix: string = '';
  @Input() prefix: string = '';
  @Input() isDisabled: boolean = false;
  @Input() imageCode: string = '';
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() dataTestId: string = '';
  @Input() controlF: FormControl | AbstractControl<any, any> | any =
    new FormControl();
  @Input() validators: ValidatorFn[] | null = null;
  @Output() errorChange: EventEmitter<string> = new EventEmitter<string>();
  matcher = new MyErrorStateMatcher();
  isRequiredValidator: boolean=false;
  showPassword: boolean = false;

  constructor(private TranslateService: TranslateService,
    private renderer: Renderer2) {}

  ngOnInit() {
    this.isValidCode(this.imageCode);
    this.isRequiredValidator = this.isRequired();
  }

  isValidCode(result: any) {
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
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const inputType = this.showPassword ? 'text' : 'password';
    const inputElement = document.getElementById(this.id);
    this.renderer.setAttribute(inputElement, 'type', inputType);
  }
}
