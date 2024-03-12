import {
  PersonalInfo,
  PersonalInfoNonSaudiReq,
  PersonalInfoSaudiReq,
} from './../../Models/personal-info';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
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
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import {
  GetDate,
  InputValidation,
  formatDate,
} from '../../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';

import { ChangeDirService } from '../../../../shared/services/change-dir.service';
// import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../../../../../environments/environment.development';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { DOCUMENT } from '@angular/common';
import { GenericService } from '../../../../shared/services/generic.service';
import { SuadiSignup, SuadiSignupRes } from '../../Models/suadi-signup';
import { VerficationCodeComponent } from '../verfication-code/verfication-code.component';
import { MatDialog } from '@angular/material/dialog';
import { SignupService } from '../../Services/signup.service';
import { ConvertDateToHijriService } from '../../../../shared/services/convert-date-to-hijri.service';
import { HijriDatePickerComponent } from '../../../../shared/components/forms/hijri-date-picker/hijri-date-picker.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';

@Component({
  selector: 'app-suadi-signup',
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
    TranslateModule,
    DatePickerComponent,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    NgxCaptchaModule,
    HijriDatePickerComponent,
  ],
  templateUrl: './suadi-signup.component.html',
  styleUrl: './suadi-signup.component.scss',
  providers: [
    ChangeDirService,
    BrowserAnimationsModule, // required animations module
    ToastrModule,
  ],
})
export class SuadiSignupComponent {
  form!: FormGroup;
  protected aFormGroup!: FormGroup;

  error: string = '';
  token: string | undefined;
  siteKey: string = '';
  recaptcha: any;
  type!: 'image';
  hijrDateFormat2:any;
  public lang?: string = 'en';
  showRecaptch: boolean = false;
  registrationUUID: string = '';
  public selectedDate: Date = new Date();

  constructor(
    private router: Router,
    public changeLangService: ChangeDirService,
    private cd: ChangeDetectorRef,
    // private TranslateService: TranslateService
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private genericService: GenericService,
    private SpinnerService: SpinnerService,
    public dialog: MatDialog,
    private SignupService: SignupService,
    private ConvertDateToHijriService: ConvertDateToHijriService,
    // private toastr: ToastrService,
    private sharedStateService: SharedStateService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.waitTime();
    }
    this.lang = localStorage.getItem('lang') || 'en';
    this.initForm();
    this.token = undefined;
    this.siteKey = environment.recaptcha.siteKey;
    console.log(this.lang);

    // this.cd.detectChanges();
  }

  initForm() {
    this.form = new FormGroup({
      nationalId: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      DOP: new FormControl(null, [Validators.required]),
      recaptcha: new FormControl('', Validators.required),
    });
  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  submit() {
    // console.log('Hello world!');

    // this.toastr.success('Hello world!')
    if (this.form.get('nationalId')?.value[0] == 1) {
      console.log(this.form.get('DOP')?.value);

      const birthdateH = this.ConvertDateToHijriService.convertToHijri(
        this.form.get('DOP')?.value
      );
      this.hijrDateFormat2 = this.ConvertDateToHijriService.convertToHijrDateFrmat2(
        this.form.get('DOP')?.value
      );
      console.log(birthdateH);

      let body = {
        registrationSaudiRequest: {
          nin: this.form.get('nationalId')?.value,
          birthdateH: birthdateH,
        },
      };
      
      this.genericService
        .post<SuadiSignupRes>('registration/register-saudi', body)
        .subscribe((data) => {
          this.registrationUUID = data.data.registrationUUID;
      console.log('@@@@@@@@@@@',data);
      const PersonalInfoBody = {
        registrationRequest: {
          yaqeenRequestUUID: this.registrationUUID,
          registrationSaudiRequest: {
            nin: this.form.get('nationalId')?.value,
            birthdateH: birthdateH,
            birthdateH2:this.hijrDateFormat2
          }
        }
      };
      this.gotoVerficationCode(PersonalInfoBody);
        }, (error) => {
          if(error){
         console.log('errrrrr',error)
          }
        }
        
        )
    } else {
      console.log(this.form.get('DOP')?.value);
      console.log('/////////////--', formatDate(this.form.get('DOP')?.value));
      
      let body = {
        registrationNonSaudiRequest: {
          iqama: this.form.get('nationalId')?.value,
          birthDateG: formatDate(this.form.get('DOP')?.value),
        },
      };

      this.genericService
        .post<SuadiSignupRes>('registration/register-nonsaudi', body)
        .subscribe((data) => {
          this.registrationUUID = data.data.registrationUUID;
          const PersonalInfoBody = {
            registrationRequest: {
              yaqeenRequestUUID:this.registrationUUID,
              registrationNonSaudiRequest: {
                iqama: this.form.get('nationalId')?.value,
                birthDateG: formatDate(this.form.get('DOP')?.value),
              }
            }
          };
          this.gotoVerficationCode(PersonalInfoBody);
        });
    }
  }

  gotoVerficationCode(PersonalInfoBody: any) {
    this.sharedStateService.setData(PersonalInfoBody);
    this.router.navigateByUrl('/auth/signup/verfication-code')
  }


  signUp() {}
  result = '';
  generateRandomString(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.result = '';

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      this.result += characters.charAt(randomIndex);
      this.cd.detectChanges();
    }
    return this.result;
  }
  isValidCode(result: any) {
    console.log(result, this.form.get('imageCode')?.value);

    const imageCodeValue = this.form.get('imageCode')?.value;
    const isImageCodeTouched = this.form.get('imageCode')?.touched;
    if (
      result !== imageCodeValue &&
      result.length > 3 &&
      imageCodeValue !== null &&
      imageCodeValue.length !== 0
    ) {
      return true;
    }
    if (
      this.form.get('imageCode')?.value == null ||
      this.form.get('imageCode')?.value.length == 0
    ) {
      return false;
    }
    return false;
  }

  handleSuccess(e: any) {
    console.log(e);
  }
  waitTime() {
    this.showRecaptch = true;
  }

  nonSuadiSignup() {
    this.router.navigateByUrl('/auth/signup/personal-info');
  }
  backToSignup() {
    this.router.navigateByUrl('auth/login');
  }
}
