import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
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
import { SharedButtonComponent } from '../../../shared/components/forms/shared-button/shared-button.component';
import { InputValidation } from '../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../shared/components/forms/date-picker/date-picker.component';
import { TextAreaComponent } from '../../../shared/components/forms/text-area/text-area.component';
import { RadioButtonComponent } from '../../../shared/components/forms/radio-button/radio-button.component';
import { CancelButtonComponent } from '../../../shared/components/forms/cancel-button/cancel-button.component';
import { SelectFieldComponent } from '../../../shared/components/forms/select-field/select-field.component';
import { TitleFormComponent } from '../../../shared/components/forms/title-form/title-form.component';
import { Option } from '../../../shared/Models/option';
import { AutoComplete } from '../../../shared/components/forms/auto-complete/auto-complete.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { InputGroupComponent } from '../../../shared/components/forms/input-group/input-group.component';
import { VerficationCodeComponent } from '../../auth/Components/verfication-code/verfication-code.component';
import { UploadFileDragComponent } from '../../../shared/components/forms/upload-file-drag/upload-file-drag.component';

@Component({
  selector: 'app-edit-personal-info',
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
    UploadFileDragComponent,
    SelectFieldComponent,
    SharedButtonComponent,
    TextAreaComponent,
    RadioButtonComponent,
    CancelButtonComponent,
    TranslateModule,
    AutoComplete,
    MatButtonToggleModule,
    InputGroupComponent
  ],
  templateUrl: './edit-personal-info.component.html',
  styleUrl: './edit-personal-info.component.scss',
})
export class EditPersonalInfoComponent  {
  form!: FormGroup;
  options: Option[] = [
    { id: '1', name: 'البيع' },
    { id: '2', name: 'الشراء' },
    { id: '3', name: 'الاسثتمار' },
    { id: '4', name: 'اخري' },
  ];
  constructor(private fb: FormBuilder, private router: Router,
    public dialog: MatDialog

    ) {}
  @Output() callParrentToGoToNextStep: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() callParrentToGoToPrevStep: EventEmitter<void> =
    new EventEmitter<void>();

  ngOnInit() {
    this.initForm();
  }
  phoneCode = [
    { id: 1, name: '+966' },
    { id: 2, name: '+249' },
    { id: 3, name: '+974' },
  ];

  initForm() {

    this.form = new FormGroup({
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

      IDType: new FormControl(null, [Validators.required]),
      IDNumber: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      DOPGregorian: new FormControl(new Date(), [Validators.required]),
      DOPHijri: new FormControl(new Date(), [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      countryKey: new FormControl(1, [
        Validators.required,
        // Validators.pattern(InputValidation.MobileKSApattern),
      ]),  
      mobileNumber: new FormControl(null, [
        Validators.required,
        // Validators.pattern(InputValidation.MobileKSApattern),
      ]),
      passward: new FormControl(null, [
        Validators.required,
      ]),
      confirmPassward: new FormControl(null, [
        Validators.required,
      ]),
    });


  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  submit() {
    console.log(this.form.value);
    this.callParrentToGoToNextStep.emit(undefined);
    this.gotoVerficationCode();
  }

  gotoVerficationCode() {
    const dialogRef = this.dialog.open(VerficationCodeComponent, {
      data: { status: 'success' },
      disableClose: true, 

    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.router.navigateByUrl('auth/signup/national-address');
    });
  }
  handleInputChange(e: any) {
    console.log(e);
  }
}
