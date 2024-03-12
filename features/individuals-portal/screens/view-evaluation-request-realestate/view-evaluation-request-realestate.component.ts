import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  AutoComplete,
  CancelButtonComponent,
  DataTableComponent,
  InputFieldComponent,
  OptionModel,
  SharedButtonComponent,
  SideNavComponent,
  TitleFormComponent,
  WidgetCardComponent,
  WidgetCardModel,
} from '@taqeem-workspace/general-lib';
import { ViewValuationRequestInformation } from '../../models/view-valuation-request-information';
import { widgetCardList } from '../../data/dummy-test-data';

@Component({
  selector: 'app-view-evaluation-request-realestate',
  templateUrl: './view-evaluation-request-realestate.component.html',
  styleUrls: ['./view-evaluation-request-realestate.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    MatCardModule,
    TitleFormComponent,
    TranslateModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    InputFieldComponent,
    SharedButtonComponent,
    AutoComplete,
    FormsModule,
    ReactiveFormsModule,
    CancelButtonComponent,
    DataTableComponent,
    MatButtonModule,
    MatIconModule,
    WidgetCardComponent,
  ],
})
export class ViewEvaluationRequestRealestateComponent implements OnInit {
  viewRequestForm!: FormGroup;
  options: OptionModel[] = [
    { id: '1', name: 'البيع' },
    { id: '2', name: 'الشراء' },
    { id: '3', name: 'الاسثتمار' },
    { id: '4', name: 'اخري' },
  ];
  dataSourceViewRequest: ViewValuationRequestInformation[] | undefined = [
    {
      valuationRequestID: '145687',
      valuationRequestTitle: 'بيع شركتي',
      valuationSector: 'العقار',
      valuationRequestStatus:
        '<span class="custom-badge custom-info">مكتمل</span>',
      numberReceivedOffers: '4',
      numberReceivedValuationReports: '2',
      reportSubmissionDate: '2024-01-2',
    },
    {
      valuationRequestID: '145237',
      valuationRequestTitle: 'بيع عقار',
      valuationSector: 'العقار',
      valuationRequestStatus:
        '<span class="custom-badge custom-danger">ملغي</span>',
      numberReceivedOffers: '42',
      numberReceivedValuationReports: '24',
      reportSubmissionDate: '2023-11-22',
    },
    {
      valuationRequestID: '134687',
      valuationRequestTitle: 'بيع ورثة',
      valuationSector: 'العقار',
      valuationRequestStatus:
        '<span class="custom-badge custom-warning">مسند</span>',
      numberReceivedOffers: '1',
      numberReceivedValuationReports: '23',
      reportSubmissionDate: '2024-01-22',
    },
    {
      valuationRequestID: '1454687',
      valuationRequestTitle: 'شراء عقار',
      valuationSector: 'العقار',
      valuationRequestStatus:
        '<span class="custom-badge custom-success">مدفوع</span>',
      numberReceivedOffers: '5',
      numberReceivedValuationReports: '5',
      reportSubmissionDate: '2024-01-22',
    },
  ];
  displayedColumns: { [index: string]: any } = {
    valuationRequestID: 'viewEvaluationRequestRealestate.valuationRequestID',
    valuationRequestTitle:
      'viewEvaluationRequestRealestate.valuationRequestTitle',
    valuationSector: 'viewEvaluationRequestRealestate.valuationSector',
    valuationRequestStatus:
      'viewEvaluationRequestRealestate.valuationRequestStatus',
    numberReceivedOffers:
      'viewEvaluationRequestRealestate.numberReceivedOffers',
    numberReceivedValuationReports:
      'viewEvaluationRequestRealestate.numberReceivedValuationReports',
    reportSubmissionDate:
      'viewEvaluationRequestRealestate.reportSubmissionDate',
  };
  isFilter: boolean = false;
  isShow: boolean = false;
  colorFilter: string = 'primary';
  iconFilter: string = 'filter_alt';

  widgetCardListData: WidgetCardModel[] = widgetCardList;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.viewRequestForm = new FormGroup({
      valuationRequestID: new FormControl(''),
      valuationRequestTitle: new FormControl(''),
      valuationSector: new FormControl(''),
      valuationRequestStatus: new FormControl(''),
      numberReceivedOffers: new FormControl(''),
      numberReceivedValuationReports: new FormControl(''),
      reportSubmissionDate: new FormControl(''),
    });
  }
  submitForm() {}

  openFilter() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.colorFilter = '';
      this.iconFilter = 'filter_alt_off';
    } else {
      this.colorFilter = 'primary';
      this.iconFilter = 'filter_alt';
    }
  }

  getFormGroup(contralName: string): FormControl {
    return this.viewRequestForm?.get(contralName) as FormControl;
  }
}
