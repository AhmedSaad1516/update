
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
import { ActivatedRoute, Router } from '@angular/router';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { InputValidation } from '../../../../shared/utils/InputValidation';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';
import { CodeInputModule } from 'angular-code-input';
import { map, take, timer } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-via-nfaz',
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
  templateUrl: './login-via-nfaz.component.html',
  styleUrl: './login-via-nfaz.component.scss'
})
export class LoginViaNfazComponent {
  form!: FormGroup;
  userCode: any = null;
  seconds: any;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      nationalId: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.router.navigateByUrl('auth/login');

  }

  submit() {
    this.router.navigateByUrl('auth/signup/recover-info');

  }
   // this called every time when user changed the code
   onCodeChanged(code: string) {
    this.userCode = null;
    console.log(code);
    
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.userCode = code;
  }
  
}
