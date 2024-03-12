import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';


import { MatCheckboxModule } from '@angular/material/checkbox'; // Add this line
import { MatTableModule } from '@angular/material/table';

import {
  AlertComponent,
  CancelButtonComponent,
  DataTableComponent,
  EventService,
  SharedButtonComponent,
  TestTableComponent,
} from '@taqeem-workspace/general-lib';
import { AddNationalAddressComponent } from './add-national-address/add-national-address.component';

interface Qualification {
  city: string;
  district: string;
  buildingNumber: string;
  selected: boolean;
}

@Component({
  selector: 'app-done-add-national-address',
  templateUrl: './done-add-national-address.component.html',
  styleUrls: ['./done-add-national-address.component.scss'],
  standalone: true,
  imports: [
    DataTableComponent,
    TranslateModule,
    CommonModule,
    MatTableModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatCheckboxModule,
    MatButtonModule,
    CancelButtonComponent,
    FormsModule,
    ReactiveFormsModule,
   
    SharedButtonComponent,
    AlertComponent,
    TestTableComponent,
  ],
})
export class DoneAddNationalAddressComponent
  implements OnInit
{
  @Input() isOneRealEstate: boolean = true;


  isShowAddManual: boolean = false;
  isShowJusticeReturnData: boolean = true;

  responseSuccess: boolean = false;

  isFilter: boolean = false;
  messageError: string = 'assetInformation.multipleAssetInformationValuation';
  typeError: string = 'alert-danger';

  displayedColumns: string[] = ['select', 'city', 'district', 'buildingNumber', 'details'];
  nationalAddressData: Qualification[] = [
    { city: 'الرياض', district: 'الياسمين ', buildingNumber: '1234', selected: false },
    { city: 'الرياض', district: 'الياسمين ', buildingNumber: '1234', selected: false },
    { city: 'الرياض', district: 'الياسمين ', buildingNumber: '1234', selected: false },
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    eventService: EventService
  ) {
   
  }

  ngOnInit() {
   
  }

  childEventAsset() {
   
  }

  ngAfterViewInit() {
    // childComponent is now available
  }

  openDialog() {
    let dialogRef = this.dialog.open(
      AddNationalAddressComponent,
      { data: { isOneRealEstate: this.isOneRealEstate } }
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  submitForm() {
    // if (this.isOneRealEstate) this.childComponent.addAsset();
    // this.callParrentToGoToNextStep.emit();
  }

  goToBack() {
    // this.callParrentToGoToPrevStep.emit();
  }

  updateChildInput(value: boolean) {
    this.isShowAddManual = value;
  }

  updateChildJusticeReturnData(value: boolean) {
    this.isShowJusticeReturnData = value;
  }

  selectAllItems(checked: boolean) {
    this.nationalAddressData.forEach(item => item.selected = checked);
  }

  deleteSelected() {
    this.nationalAddressData = this.nationalAddressData.filter(item => !item.selected);
  }
  updateSelected(){
  const selectedItems = this.nationalAddressData.filter(item => item.selected);
  const dialogRef = this.dialog.open(AddNationalAddressComponent, {
    data: selectedItems[0] 
  });
  dialogRef.afterClosed().subscribe(result => {
  });
  }
  showDetails(item: Qualification) {
    // اعرض تفاصيل المؤهل العلمي الذي تم النقر عليه
    console.log(item);
  }
  
}
