import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { NavigationEnd, Router } from '@angular/router';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { InputValidation } from '../../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';
import { CodeInputModule } from 'angular-code-input';
import { map, take, timer } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { GenericService } from 'apps/individuals-app/src/app/shared/services/generic.service';
import { ForgetPassword } from '../../Models/login-info';
@Component({
  selector: 'app-reset-password',
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
    CodeInputModule,
    TranslateModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  form!: FormGroup;
  userCode: any = null;
  seconds: any;


  constructor(private fb: FormBuilder, private router: Router,
    private genericService: GenericService,
    ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  submit() {
      
    const body={
      emailOrNationalId: this.form.get('email')?.value
    }
    console.log('-----bbbb',body);
    
    this.genericService
    .post<ForgetPassword>('authentication/forget-password', body)
    .subscribe((data) => {
      console.log('تم إرسال البريد الإلكتروني بنجاح:', data);
    },
    (error) => {
      if(error){
        console.log('--error--',error);
    }})
  }



  backToSignup() {
    this.router.navigateByUrl('auth/login');
  }
}
