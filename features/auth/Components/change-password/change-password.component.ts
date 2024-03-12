import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
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
import { InputValidation } from '../../../../shared/utils/InputValidation';
import { InputFieldComponent, MyErrorStateMatcher } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';
import { CodeInputModule } from 'angular-code-input';
import { map, take, timer } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { GenericService } from 'apps/individuals-app/src/app/shared/services/generic.service';
import { ChangePassword } from '../../Models/login-info';

@Component({
  selector: 'app-change-password',
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
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  form!: FormGroup;
  userCode: any = null;
  seconds: any;

  constructor(private fb: FormBuilder, private router: Router,
    private genericService: GenericService,
    ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      newPassword: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, {
      validators: this.passwordsMatchValidator
    });
  }
  private passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword.value === confirmPassword.value ? null : { 'passwordsNotMatch': true };
  }
  submit() {
    const body={
      username: '',
      newPassword: this.form.get('newPassword')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value
    }
    this.genericService
    .post<ChangePassword>('authentication/change-password', body)
    .subscribe((data) => {
      this.router.navigateByUrl('auth/login');
    },
    (error) => {
      if(error){
        console.log('--error--',error);
        // this.isErrorCode=1;
        
    }})
  }
}
