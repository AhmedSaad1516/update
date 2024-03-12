import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';

import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Lookup } from '../../../../features/individuals-portal/models/lookup';
import { ChangeDirService } from '../../../services/change-dir.service';

 interface Option {
  id: number;
  name: string;
  // img: string;

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [ChangeDirService],
})
export class SelectFieldComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() error: string = '';
  @Input() hint: string = '';
  @Input() isDisabled: boolean = false;
  @Input() options: Lookup[] | any = [];
  @Input() controlF: FormControl | AbstractControl<any, any> | any =
    new FormControl();
  @Output() selectChange: EventEmitter<string> = new EventEmitter<string>();
  // @Input() options: Option[] = [];

  matcher = new MyErrorStateMatcher();
  isRequiredValidator: boolean = false;
  lang: string = 'en';

  constructor(private langService: ChangeDirService) {}

  ngOnInit() {
    this.isRequiredValidator = this.isRequired();
    this.lang = this.langService.langStorage;
  }

  isRequired() {
    return this.controlF.validator ? !! this.controlF.validator(this.controlF) : false;
  }

  getOptionLabel() {
    const selectedOption = this.options.find((option: { id: any; }) => option.id === this.controlF.value);
    return selectedOption ? selectedOption.name : '';
  }

  handleSelected(): void {
    this.selectChange.emit();
  }
}
