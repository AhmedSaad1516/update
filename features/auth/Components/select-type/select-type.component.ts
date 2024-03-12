import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SharedButtonComponent } from '../../../../shared/components/forms/shared-button/shared-button.component';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { DatePickerComponent } from '../../../../shared/components/forms/date-picker/date-picker.component';
import { CodeInputModule } from 'angular-code-input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-type',
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
  templateUrl: './select-type.component.html',
  styleUrl: './select-type.component.scss',
})
export class SelectTypeComponent {
  users = [
    {
      id: 0,
      title: 'signup.Individuals_Portal',
      desciption: 'signup.Individuals_PortalDesc',
      imgIcon: 'assets/img/auth/individual.svg',
      link: 'link',
    },
    {
      id: 1,
      title: 'signup.Partners_Portal',
      desciption: 'signup.Partners_PortalDesc',
      imgIcon: 'assets/img/auth/company.svg',
      link: 'link',
    },
    {
      id: 2,
      title: 'signup.Valuers_Portal',
      desciption: 'signup.Valuers_PortalDesc',
      imgIcon: 'assets/img/auth/accomidation.svg',
      link: 'link',
    },
    {
      id: 3,
      title: 'signup.IntelligencePortal',
      desciption: 'signup.IntelligencePortalDesc',
      imgIcon: 'assets/img/auth/intiligant.svg',
      link: 'link',
    },
  ];
}
