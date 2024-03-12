import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { SharedMapComponent } from '../../../../shared/components/shared-map/shared-map.component';
import { ChangeDirService } from '../../../../shared/services/change-dir.service';
import { InputValidation } from '../../../../shared/utils/InputValidation';
import { TitleFormComponent } from '../../../../shared/components/forms/title-form/title-form.component';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { SelectFieldComponent } from '../../../../shared/components/forms/select-field/select-field.component';
import { TextAreaComponent } from '../../../../shared/components/forms/text-area/text-area.component';
import { RadioButtonComponent } from '../../../../shared/components/forms/radio-button/radio-button.component';
import { CancelButtonComponent } from '../../../../shared/components/forms/cancel-button/cancel-button.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VerficationCodeComponent } from '../verfication-code/verfication-code.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';
import { GenericService } from '../../../../shared/services/generic.service';
import { LoginInfo, LoginResponse } from '../../Models/login-info';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    SharedButtonComponent,
    TranslateModule,
    SharedMapComponent,
    TitleFormComponent,
    InputFieldComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    SelectFieldComponent,
    TextAreaComponent,
    RadioButtonComponent,
    CancelButtonComponent,
    MatCheckboxModule,
    TranslateModule,
  ],
  providers: [ChangeDirService],
})
export class SigninComponent {
  password: any;
  show = false;
  public CustomControler: any;
  form!: FormGroup;
  changePassword: boolean = false;
  loginRequestSuccess :boolean=false;
  loginReByLinkSuccess :boolean=false;
  codeLimitEnd :boolean = false;
  loginRequestFailed:boolean=false;
  errorMessages:any;
  errorIs:boolean=false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public changeLangService: ChangeDirService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public dialog: MatDialog,
    private sharedStateService: SharedStateService,
    private genericService: GenericService,
    // private toastr: ToastrService,
    private translateService: TranslateService

  ) {}

  ngOnInit() {
    this.initForm();
    this.sharedStateService.getData().subscribe(data => {
      if(data=='Success'){
        this.loginRequestSuccess = true;
      }
      if(data=='Failed'){
        this.loginRequestFailed = true;
      }
      if(data=='loginReByLinkSuccess'){
        this.loginReByLinkSuccess=true;
      }
      if(data=='loginReByLinkFaild'){
        this.loginRequestFailed = true;
      }
      if(data=='codeLimitEnd'){
        this.codeLimitEnd= true
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        // Validators.pattern(InputValidation.complexPassword),
      ]),
    });
  }

  signup() {
    this.router.navigateByUrl('signup');
  }

  submit() {
    let body: LoginInfo = {
      username: this.form.get('email')?.value.trim(),
      password: this.form.get('password')?.value.trim(),
    };
    console.log('login - body', body);

    this.genericService
      .post<LoginResponse>('authentication/login', body)
      .subscribe(
        (data) => {
          const access_token = data;
          localStorage.setItem('token' , access_token.data.token)
          localStorage.setItem('nextdriven_user', access_token.data.token);
          localStorage.setItem('refreshToken', access_token.data.refreshToken);
          this.router.navigateByUrl('/auth/signup/verfication-code')
        },
        (error) => {
          console.log(error.error.error.errorCode);

          if(error.error.error.errorCode=='passwords_is_invalid'){
            this.errorIs=true;
            this.errorMessages="passwords is invalid"
          }
          if(error.error.error.errorCode=='user_not_found'){
            this.errorIs=true;
            this.errorMessages="User Not Found"
          }
        }
      );
  }



  gotoVerficationCode() {
    // this.redirectToComponentOTP()
    // this.router.navigateByUrl('/auth/signup/verfication-code');
    // this.router.navigate(['/auth/signup/verfication-code'], {
    //   queryParams: {
    //     callbackFunction: this.navigateToUserType
    //       .toString(),
    //   },
    // });
    // const dialogRef = this.dialog.open(VerficationCodeComponent, {
    //   data: { status: 'success' },
    //   disableClose: true,

    // });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this.router.navigateByUrl('auth/user-type');
    // });
  }
  navigateToUserType() {
    this.router.navigateByUrl('auth/user-type');
  }
  loginViaNfaz() {
    this.router.navigateByUrl('auth/login/nfaz');
  }

  recoverData() {
    this.router.navigateByUrl('auth/signup/suadi-citizen');
  }
  resetPassword() {
    this.router.navigateByUrl('auth/reset-password');
  }
  redirectToComponentOTP() {
    const dataToSend = 'login';
    this.router.navigate(['/auth/signup/verfication-code', { data: dataToSend }]);
    console.log('llllllllllllllllllllooooooooo');

  }
}
