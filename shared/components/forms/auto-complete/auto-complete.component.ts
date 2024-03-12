import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Option } from '../../../Models/option';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Lookup } from '../../../../features/individuals-portal/models/lookup';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class AutoComplete implements OnInit {
  @Input() control: FormControl | any = new FormControl();
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() hint: string = '';
  filteredOptions: Observable<Option[]> | undefined;
  @Input() options: Option[] | any = [];
  @Input() id: string = '';
  isRequiredValidator: boolean = false;
  @Input() isDisabled: boolean = false;

  
  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
    this.isRequiredValidator = this.isRequired();
  }

  private _filter(value: string): Option[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    console.log(this.options, this.filteredOptions);

    return this.options.filter((option: Option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  isRequired() {
    return this.control.validator
      ? !!this.control.validator(this.control)
      : false;
  }
}
