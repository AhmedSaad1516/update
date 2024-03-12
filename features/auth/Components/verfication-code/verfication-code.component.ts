import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { InputValidation } from '../../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';
import { CodeInputModule } from 'angular-code-input';
import { map, take, timer } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../../../shared/components/custom-alert/custom-alert.component';
import { ApiService } from '../../Services/api.service';
import { SharedStateService } from '../../../../shared/services/shared-state.service';
import { GenericService } from 'apps/individuals-app/src/app/shared/services/generic.service';
import { SuadiRegister, SuadiSignup, SuadiSignupRes } from '../../Models/suadi-signup';
import { PersonalInfoComponent } from '../recover-info-stepper/personal-info/personal-info.component';
import { NationalAddressReq, NationalAddressRes } from '../../Models/national-addres';
import { PersonalInfo } from '../../Models/personal-info';

@Component({
  selector: 'app-verfication-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomAlertComponent,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    SharedButtonComponent,
    InputFieldComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    DatePickerComponent,
    CodeInputModule,
    TranslateModule,
  ],
  templateUrl: './verfication-code.component.html',
  styleUrl: './verfication-code.component.scss',
  // providers:[MatDialog]
})
export class VerficationCodeComponent {
  @ViewChild(PersonalInfoComponent) personalInfoComponent!: PersonalInfoComponent;
  form!: FormGroup;
  userCode: any = null;
  seconds: any;
  params: any = null;
  callbackFunctionString: any = null;
  callbackFunction: any = null;
  receivedDataFrom: any;
  PersonalInfo: any;
  verify_success: boolean = false
  registrationRequest: any;
  isErrorCode :any;
  loginRequestStatus :any;
  verifyBody:any;
  recoverInfoBody:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private genericService: GenericService,
    private apiService: ApiService,
    private sharedStateService: SharedStateService,
    private translateService: TranslateService

    // public dialogRef: MatDialogRef<VerficationCodeComponent>,
  ) {
    // this.route.params.subscribe(params => {
    //    this.receivedDataFrom = params;
    //   console.log('PersonalInfoBody',this.receivedDataFrom); 
    // });
  }

  ngOnInit() {
    this.sharedStateService.getData().subscribe(data => {
      this.receivedDataFrom = data;
      console.log('PersonalInfoBody', this.receivedDataFrom);
    });
    const countdown$ = timer(0, 1000).pipe(
      take(60),
      map((secondsElapsed) => 300 - secondsElapsed)
    );

    countdown$.subscribe((secondsLeft) => {
      this.seconds = secondsLeft;
    });
  }
  // recieveCallback() {
  //   this.callbackFunctionString =
  //     this.route.snapshot.queryParams['callbackFunction'];

  //   if (this.callbackFunctionString) {
  //     try {

  //       const dynamicFunction = new Function(this.callbackFunctionString);
  //       dynamicFunction.call(this)
  //     } catch (error) {
  //       console.error('Error while executing the callback function:', error);
  //     }
  //   }
  // }

  callendpointFromParams: any;

  submit() {

    const currentPage = this.sharedStateService.getCurrentPage();
    console.log('currentPage', currentPage);
    switch (currentPage) {
      case '/auth/login':
        console.log('call Endpoint login Page');
        const loginVerficationBody={
          otp: this.userCode,
          registrationUUID:localStorage.getItem('registrationUUID')?localStorage.getItem('registrationUUID'):""
        }
        this.genericService
        .post<SuadiSignupRes>('registration/submit-otp', loginVerficationBody)
        .subscribe((data) => {
          this.verify_success = true;
          this.openSuccessAlert()
          // this.toastr.success(
          //   this.translateService.instant('popup.RegisterSuccess')
          // );
          this.router.navigateByUrl('auth/user-type');
        },
        (error) => {
          if(error){
            this.isErrorCode=1;
        }})
        break;
      case '/auth/signup/suadi-citizen':
        console.log('call Endpoint suadi-citizen Page');
        if(this.receivedDataFrom.registrationRequest.registrationSaudiRequest){
          this.verifyBody = {
            absherUserOTP: this.userCode,
              registrationRequest:{
              yaqeenRequestUUID:  this.receivedDataFrom.registrationRequest.yaqeenRequestUUID,
              registrationSaudiRequest: {
                  nin:this.receivedDataFrom.registrationRequest.registrationSaudiRequest.nin,
                  birthdateH: this.receivedDataFrom.registrationRequest.registrationSaudiRequest.birthdateH2
              }
            }}
          }
          else{
            this.verifyBody = {
              absherUserOTP: this.userCode,
              registrationRequest:{
              yaqeenRequestUUID:  this.receivedDataFrom.registrationRequest.yaqeenRequestUUID,
              registrationNonSaudiRequest: {
                iqama:this.receivedDataFrom.registrationRequest.registrationNonSaudiRequest.iqama,
                  birthdateH: this.receivedDataFrom.registrationRequest.registrationNonSaudiRequest.birthDateG
              }
            }}
          }
        this.genericService
        .post<SuadiSignupRes>('registration/submit-otp', this.verifyBody)
        .subscribe((data) => {
          this.verify_success = true;
          this.goToRecoverInfo(this.receivedDataFrom.registrationRequest);
        },
        (error) => {
          if(error){
            this.isErrorCode=1;
          }
        });
        break;
      case '/auth/signup/recover-info/personal-info':
        console.log('call Endpoint recover-info/personal-info Page');
        this.goToRegister(this.receivedDataFrom);
        break;
        case '/auth/signup/personal-info':
          console.log('call Endpoint login Page');
          console.log('--------',this.receivedDataFrom);
          const data = this.receivedDataFrom.data
          const signByLink={
            requestId:this.receivedDataFrom.requestId,
            otpValue:this.userCode,
            regForm:
                {
                    fnameAr:data.FirstNameAr,
                    snameAr:data.SecondNameAr,
                    tnameAr:data.GrandfatherNameAr,
                    lnameAr:data.LastNameAr,
                    fnameEn:data.FirstNameEn,
                    snameEn:data.SecondNameEn,
                    tnameEn:data.GrandfatherNameEn,
                    lnameEn:data.LastNameEn,
                    documentType:data.IDType,
                    documentId:data.IDNumber,
                    gender:data.gender,
                    nationality:data.nationality,
                    gregorianBirthdate:this.receivedDataFrom.birthdateH,
                    mobileNumber:this.receivedDataFrom.phoneCode+data.mobileNumber,
                    email:data.email,
                    password:data.passward,
                    passwordConfimation:data.confirmPassward
                }
        }
          this.genericService
          .post<PersonalInfo>('link/registration/validate', signByLink)
          .subscribe((data) => {
            this.verify_success = true;
            this.openSuccessAlert();
             this.sharedStateService.setData(this.loginRequestStatus='loginReByLinkSuccess');
             this.router.navigateByUrl('auth/login');
          },
          (error) => {
            if(error.error=='OTP_REQUEST_IS_LOCKED'){
             this.sharedStateService.setData(this.loginRequestStatus='codeLimitEnd');
             this.router.navigateByUrl('auth/login');
            }
            if(error.error=='OTP_REQUEST_NOT_FOUND'){
              this.isErrorCode=1;
          }
          if(error){
            this.isErrorCode=1;
          }
          else{
            this.sharedStateService.setData(this.loginRequestStatus='loginReByLinkFaild');
            this.router.navigateByUrl('auth/login');
          }
        })
          break;
      default:
        // Default behavior for page A
        break;
    }
    
 

  }


  goToRecoverInfo(data: any) {
    console.log('sss',data);
    
    if(this.receivedDataFrom.registrationRequest.registrationSaudiRequest){
      this.recoverInfoBody = {
        registrationUUID:  data.yaqeenRequestUUID,
        registrationSaudiRequest: {
          nin:  data.registrationSaudiRequest.nin,
          birthdateH: data.registrationSaudiRequest.birthdateH2
        }
      }}
          else{
            this.recoverInfoBody = {
              registrationUUID:  data.yaqeenRequestUUID,
              registrationNonSaudiRequest: {
                iqama:  data.registrationNonSaudiRequest.iqama,
                birthDateG: data.registrationNonSaudiRequest.birthDateG
              }
            }
          }     
    // console.log('body----',body);
    this.genericService
      .post<SuadiRegister>('registration/v2/register', this.recoverInfoBody)
      .subscribe((data) => {
        console.log('###########', data);
        this.PersonalInfo = [data, this.receivedDataFrom,this.userCode];
        this.sharedStateService.setData(this.PersonalInfo);
        this.router.navigateByUrl('/auth/signup/recover-info/personal-info')
      },
      (error) => {
        console.log('errrrrrrrrrrr', error);
        this.sharedStateService.setData(this.loginRequestStatus='Failed');
        this.router.navigateByUrl('/auth/login')
      });
  }

  goToRegister(data: any) {
    console.log('zzzzzzzz', data);
    const userCode = this.userCode;
    const infoData = data
    console.log('rrrrrrrrrrrrr', infoData);
    let body = {
      otp: userCode,
      registrationUUID:infoData.registrationRequest.yaqeenRequestUUID
      // mobileNumber: infoData.mobile_number,
      // email: infoData.email,
      // password: infoData.password,
      // repeatPassword: infoData.repeatPassword,
      // userOTP: userCode,
      // registrationRequest:{
      //   yaqeenRequestUUID:infoData.registrationRequest.yaqeenRequestUUID,
      //   registrationSaudiRequest:{
      //     nin:infoData.registrationRequest.registrationSaudiRequest.nin,
      //     birthdateH:infoData.registrationRequest.registrationSaudiRequest.birthdateH2
      //   }

      // } 
    }
    this.genericService
      .post<PersonalInfo>('registration/register/complete/submit-otp', body)
      .subscribe((data) => {
        console.log('ddddddd--',data);
        this.openSuccessAlert()
        // this.toastr.success(this.translateService.instant('popup.RegisterSuccess'));
        this.sharedStateService.setData(this.loginRequestStatus='Success');
        localStorage.setItem('registrationUUID',infoData.registrationRequest.yaqeenRequestUUID)
        this.router.navigateByUrl('auth/login');
      },
        (error) => {
          if(error){
            this.isErrorCode=1;
          }
        }
      );
    // this.personalInfoComponent.submitPersonalInfo(this.userCode,data);
  }
  login() {
    this.router.navigateByUrl('auth/login');
  }
  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.userCode = null;
    console.log(code);
    this.isErrorCode = false;
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.userCode = code;
    console.log('cccccccccccc');
    
    if (code.length < 4) {
      this.isErrorCode = true; // Set the error state if code length is less than 4
    } else {
      this.isErrorCode = false;
      // Continue with code completion logic
    }
  }
  backToSignup() {
    this.router.navigateByUrl('auth/login');
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
