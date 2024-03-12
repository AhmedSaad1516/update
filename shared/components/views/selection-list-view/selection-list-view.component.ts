import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import {
  FormsModule,
  NgControl,
  FormControl,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

interface selectionValue {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
}

@Component({
  selector: 'selection-list-view',
  templateUrl: './selection-list-view.component.html',
  styleUrls: ['./selection-list-view.component.scss'],
  standalone: true,
  imports: [
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    CommonModule,
  ],
})
export class SelectionListViewComponent implements OnInit {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() controlF: FormControl = new FormControl([]);
  @Input() typesOfShoes: selectionValue[] = [];
  @Output() checkChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSelectedOption(event: any) {
    if (event.hasValue()) {
      const selectedItems = event.selected.map(
        (option: { value: any }) => option.value
      );
      this.controlF.setValue(selectedItems);
    }
  }

  isRequired() {
    return this.controlF.validator
      ? !!this.controlF.validator(this.controlF)
      : false;
  }
}
