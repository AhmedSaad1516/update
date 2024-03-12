import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SharedButtonComponent } from '../../../../../shared/components/forms/shared-button/shared-button.component';
import { InputValidation } from '../../../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../../shared/components/forms/date-picker/date-picker.component';
import { Option } from '../../../../../shared/Models/option';
import { CancelButtonComponent } from '../../../../../shared/components/forms/cancel-button/cancel-button.component';
import { SelectFieldComponent } from '../../../../../shared/components/forms/select-field/select-field.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../../../../shared/components/custom-alert/custom-alert.component';
import { AutoComplete } from '../../../../../shared/components/forms/auto-complete/auto-complete.component';
@Component({
  selector: 'app-national-address',
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
    SelectFieldComponent,
    DatePickerComponent,
    CancelButtonComponent,
    TranslateModule,
    AutoComplete,
  ],
  templateUrl: './national-address.component.html',
  styleUrl: './national-address.component.scss',
})
export class NationalAddressComponent {
  form!: FormGroup;
  options: Option[] = [
    { id: '1', name: 'البيع' },
    { id: '2', name: 'الشراء' },
    { id: '3', name: 'الاسثتمار' },
    { id: '4', name: 'اخري' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}
  @Output() callParrentToGoToNextStep: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() callParrentToGoToPrevStep: EventEmitter<void> =
    new EventEmitter<void>();

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      city: new FormControl('البيع', [Validators.required]),
      district: new FormControl('البيع', [Validators.required]),
      street: new FormControl('شارع خالد بن الوليد', [Validators.required]),
      buildingNumber: new FormControl(5, [Validators.required]),
      additionalNumber: new FormControl(5959595986, [Validators.required]),
      postalCode: new FormControl(635112, [Validators.required]),
      nationalAbbreviatedAddress: new FormControl('المملكة', [
        Validators.required,
      ]),
      // nationalIdImg: new FormControl(null, [Validators.required]),
    });
    this.form.disable()
    console.log(this.form.value);

  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  submit() {
    console.log(this.form.value);

    console.log(this.form.value);
    this.callParrentToGoToNextStep.emit();
    this.openSuccessAlert();
    
    // 
  }

  back() {
    this.callParrentToGoToPrevStep.emit();
  }
  gotoVerficationCode() {
    this.router.navigateByUrl('auth/signup/verfication-code/absher');
  }
  openSuccessAlert(): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      data: { status: 'success' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.gotologin();
    });
  }
  gotologin() {
    this.router.navigateByUrl('auth/login');
  }
}
