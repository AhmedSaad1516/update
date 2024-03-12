import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
import { SharedButtonComponent } from '../../../../../shared/components/forms/shared-button/shared-button.component';
import { InputValidation } from '../../../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../../shared/components/forms/date-picker/date-picker.component';
import { TextAreaComponent } from '../../../../../shared/components/forms/text-area/text-area.component';
import { RadioButtonComponent } from '../../../../../shared/components/forms/radio-button/radio-button.component';
import { CancelButtonComponent } from '../../../../../shared/components/forms/cancel-button/cancel-button.component';
import { SelectFieldComponent } from '../../../../../shared/components/forms/select-field/select-field.component';
import { TitleFormComponent } from '../../../../../shared/components/forms/title-form/title-form.component';
import { Option } from '../../../../../shared/Models/option';
import { AutoComplete } from '../../../../../shared/components/forms/auto-complete/auto-complete.component';
import { VerficationCodeComponent } from '../../verfication-code/verfication-code.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { InputGroupComponent } from '../../../../../shared/components/forms/input-group/input-group.component';
import { GenericService } from '../../../../../shared/services/generic.service';
import { PersonalInfo, sentOtp } from '../../../Models/personal-info';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';
import { HijriDatePickerComponent } from '../../../../../shared/components/forms/hijri-date-picker/hijri-date-picker.component';
import { ConvertDateToHijriService } from '../../../../../shared/services/convert-date-to-hijri.service';

@Component({
  selector: 'app-personal-info',
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
    HijriDatePickerComponent,
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
    MatButtonToggleModule,
    InputGroupComponent
  ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
  form!: FormGroup;
  options: Option[] = [
    { id: '1', name: 'البيع' },
    { id: '2', name: 'الشراء' },
    { id: '3', name: 'الاسثتمار' },
    { id: '4', name: 'اخري' },
  ];
  gender:Option[]=[
    { id: '1', name: 'male' },
    { id: '2', name:  'female'  },
  ]
  nationality:Option[]=[
    { id: '1', name: 'saudi' },
    { id: '2', name:  'egyptian'  },
  ]
  IDType:Option[]=[
    { id: '1', name: 'passport' },
    { id: '2', name: 'other' },
  ]
  requestId:any;
  codeName :any;
  constructor(private fb: FormBuilder, private router: Router,
    public dialog: MatDialog,
    private genericService: GenericService,
    private sharedStateService: SharedStateService,
    private translateService: TranslateService,
    private ConvertDateToHijriService: ConvertDateToHijriService,


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
        Validators.pattern(InputValidation.MobileKSApattern),
      ]),
      passward: new FormControl(null, [
        Validators.required,  Validators.minLength(8)
      ]),
      confirmPassward: new FormControl(null, [
        Validators.required,
        this.validatePasswordMatch.bind(this)
      ]),
    });


  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  submit() {
    console.log(this.form.value);
    const data = this.form.value;
    const birthdateH = this.ConvertDateToHijriService.convertToHijrDateFrmat2(
      this.form.get('DOPHijri')?.value
    );
    const mobileCode = this.phoneCode.find((item) => item.id === data.countryKey);
  if (mobileCode) {
   this.codeName = mobileCode.name
  }
    let body = {
      mobileNumber:this.codeName+data.mobileNumber,
      email:data.email
    };
    this.genericService
      .post<sentOtp>('link/registration', body)
      .subscribe((data) => {
        this.requestId = data.data.requestId;
        const PersonalInfo ={
          requestId:this.requestId,
          data:this.form.value,
          phoneCode:this.codeName
        }
        this.gotoVerficationCode(PersonalInfo); 
        console.log('@@@@@@@@@@@',data),'pppppp',PersonalInfo;
  
      }, (error) => {
        if(error.error=='REACHED_MAX_OF_RESEND_LOCK'){
          console.log('تجاوزت عدد مرات الدخول'); 
        }
        if(error){
          console.log('errrrrr',error)
        }
      })
  }

  gotoVerficationCode(PersonalInfoBody: any) {
    this.sharedStateService.setData(PersonalInfoBody);
    this.router.navigateByUrl('/auth/signup/verfication-code')
  }

  handleInputChange(e: any) {
    console.log(e);
  }
  backToSignup() {
    this.router.navigateByUrl('auth/login');
  }
  validatePasswordMatch(control: FormControl): { [key: string]: any } | null {
    const password = this.form?.get('passward')?.value;
    const confirmPassward = control.value;
  
    if (password !== confirmPassward) {
      return { passwordMismatch: true };
    }
  
    return null;
  }
}
