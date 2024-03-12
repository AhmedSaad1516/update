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
import { NationalAddressReq, NationalAddressRes } from '../../../Models/national-addres';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { GenericService } from '../../../../../shared/services/generic.service';
import { SignupService } from '../../../Services/signup.service';
import { PersonalInfo } from '../../../Models/personal-info';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';
import { CustomAlertComponent } from '../../../../../shared/components/custom-alert/custom-alert.component';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CustomAlertComponent,
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
  PersonalInfo:any;
  PersonalInfoBody:any;
  loginRequestStatus:any;
  constructor(private fb: FormBuilder, private router: Router,
    public dialog: MatDialog,
    private genericService: GenericService,
    private SpinnerService: SpinnerService,
    private SignupService: SignupService,
    private sharedStateService: SharedStateService,
    // private toastr: ToastrService,
    private translateService: TranslateService
    ) {}
  @Output() callParrentToGoToNextStep: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() callParrentToGoToPrevStep: EventEmitter<void> =
    new EventEmitter<void>();

  ngOnInit() {
    this.sharedStateService.getData().subscribe(data => {
      this.PersonalInfo = data;
            console.log('PersonalInfo',this.PersonalInfo); 
    });
    this.initForm(this.PersonalInfo?this.PersonalInfo : this.SignupService.PersonalInfo);

    // this.initForm(this.SignupService.PersonalInfo);
  }
  phoneCode = [
    { id: 1, name: '+966' },
    { id: 2, name: '+249' },
    { id: 3, name: '+974' },
  ];

  initForm(PersonalInfo:[PersonalInfo]) {
    console.log('P************@@@@',PersonalInfo);
    
    this.form = new FormGroup({

      FirstNameAr: new FormControl(PersonalInfo[0].data.personBasicInfo.firstName, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      SecondNameAr: new FormControl(PersonalInfo[0].data.personBasicInfo.fatherName, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      GrandfatherNameAr: new FormControl(PersonalInfo[0].data.personBasicInfo.grandFatherName, [
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      FamilyNameAr: new FormControl(PersonalInfo[0].data.personBasicInfo.familyName, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      FirstNameEn: new FormControl(PersonalInfo[0].data.personBasicInfo.firstNameT, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      SecondNameEn: new FormControl(PersonalInfo[0].data.personBasicInfo.familyNameT, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      GrandfatherNameEn: new FormControl(PersonalInfo[0].data.personBasicInfo.grandFatherNameT, [
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      FamilyNameEn: new FormControl(PersonalInfo[0].data.personBasicInfo.familyNameT, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      IDType: new FormControl('البيع', [Validators.required]),
      IDNumber: new FormControl(10552522, [Validators.required]),
      nationality: new FormControl('Saudi', [Validators.required]),
      gender: new FormControl(PersonalInfo[0].data.personBasicInfo.sexDescAr, [Validators.required]),
      DOPGregorian: new FormControl(new Date(PersonalInfo[0].data.personBasicInfo.convertDate.dateString), [Validators.required]),
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

    this.form.controls['FirstNameAr'].disable();
    this.form.controls['FirstNameEn'].disable();
    this.form.controls['SecondNameAr'].disable();
    this.form.controls['SecondNameEn'].disable();
    this.form.controls['GrandfatherNameAr'].disable();
    this.form.controls['GrandfatherNameEn'].disable();
    this.form.controls['FamilyNameAr'].disable();
    this.form.controls['FamilyNameEn'].disable();

    this.form.controls['IDType'].disable();
    this.form.controls['IDNumber'].disable();
    this.form.controls['nationality'].disable();
    this.form.controls['gender'].disable();
    this.form.controls['DOPGregorian'].disable();
    this.form.controls['DOPHijri'].disable();

  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  submit() {
    console.log(this.form.value);
    console.log('----',this.PersonalInfo);
    
    // let body :NationalAddressReq = {
    //   mobileNumber:this.form.get('mobileNumber')?.value,
    //   email:this.form.get('email')?.value,
    //   password:this.form.get('passward')?.value,
    //   repeatPassword:this.form.get('confirmPassward')?.value,
    //   yaqeen_form_id:"",
    //   userOTP:userCode,
    //   registrationRequest:this.PersonalInfo[1].registrationRequest
    // }
    if(this.PersonalInfo[1].registrationRequest.registrationSaudiRequest){
      console.log('-------',this.phoneCode);
      console.log('-------',this.form.get('mobileNumber')?.value);
      
      this.PersonalInfoBody  = {
        mobileNumber:this.phoneCode[0].name+this.form.get('mobileNumber')?.value,
        email:this.form.get('email')?.value,
        userOTP:this.PersonalInfo[2],
        password:this.form.get('passward')?.value,
        repeatPassword:this.form.get('confirmPassward')?.value,
        registrationRequest:{
          registrationUUID:   this.PersonalInfo[1].registrationRequest.yaqeenRequestUUID,
          registrationSaudiRequest: {
            nin:   this.PersonalInfo[1].registrationRequest.registrationSaudiRequest.nin,
            birthdateH:  this.PersonalInfo[1].registrationRequest.registrationSaudiRequest.birthdateH2
          }
        }
       
      }
    }
    else{
      this.PersonalInfoBody  = {
        mobileNumber:this.phoneCode[0].name+this.form.get('mobileNumber')?.value,
        email:this.form.get('email')?.value,
        userOTP:this.PersonalInfo[2],
        password:this.form.get('passward')?.value,
        repeatPassword:this.form.get('confirmPassward')?.value,
        registrationRequest:{
          registrationUUID:   this.PersonalInfo[1].registrationRequest.yaqeenRequestUUID,
          registrationNonSaudiRequest: {
            iqama:   this.PersonalInfo[1].registrationRequest.registrationNonSaudiRequest.iqama,
            birthDateG:  this.PersonalInfo[1].registrationRequest.registrationNonSaudiRequest.birthDateG
          }
        }
       
      }
    }

    this.genericService
    .post<PersonalInfo>('registration/register/complete', this.PersonalInfoBody)
    .subscribe((data) => {
      // this.toastr.success(this.translateService.instant('popup.RegisterSuccess'));
      // this.openSuccessAlert()

      // this.sharedStateService.setData(this.loginRequestStatus='Success');
      this.gotoVerficationCode()
    this.router.navigateByUrl('/auth/signup/verfication-code')
            // this.router.navigateByUrl('auth/login');
    },
    (error) => {
      // this.toastr.error(error.message);
      this.sharedStateService.setData(this.loginRequestStatus='Failed');
      this.router.navigateByUrl('auth/login');
    }
  );
  }

  gotoVerficationCode() {
    const body  = {
      mobile_number:this.phoneCode[0].name+this.form.get('mobileNumber')?.value,
      email:this.form.get('email')?.value,
      password:this.form.get('passward')?.value,
      repeatPassword:this.form.get('confirmPassward')?.value,
      registrationRequest:this.PersonalInfo[1].registrationRequest
    }
    this.sharedStateService.setData(body);
    this.router.navigateByUrl('/auth/signup/verfication-code')
  }

  getNationalAddress(body:NationalAddressReq){
    this.SpinnerService.show();
    setTimeout(() => {
      this.genericService
        .post<NationalAddressRes>('assets/national-address.json', body)
        .subscribe((data) => {
          // this.gotoVerficationCode();

        });
    }, 3000);
  }
  handleInputChange(e: any) {
    console.log(e);
  }
  validatePasswordMatch(control: FormControl): { [key: string]: any } | null {
    const password = this.form?.get('passward')?.value;
    const confirmPassward = control.value;
  
    if (password !== confirmPassward) {
      return { passwordMismatch: true };
    }
  
    return null;
  }

  openSuccessAlert(): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      data: { status: 'success' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.login();
    });
  }
}
