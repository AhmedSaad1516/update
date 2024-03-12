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
import { AssetInformation } from '../../../models/asset-information';
import { ValuationRequestInformation } from '../../../models/valuation-request-information';
import { ValuationRequestInformationValidation } from '../../../models/valuation-request-information-validation';
import { AddManualComponent } from './add-manual/add-manual.component';
import { DataRetrievalMinistryJusticeComponent } from './data-retrieval-ministry-justice/data-retrieval-ministry-justice.component';
import { DialogDataRetrievalMinistryJusticeComponent } from './dialog-data-retrieval-ministry-justice/dialog-data-retrieval-ministry-justice.component';

import {
  AlertComponent,
  CancelButtonComponent,
  DataTableComponent,
  EventService,
  SharedButtonComponent,
  TestTableComponent,
} from '@taqeem-workspace/general-lib';

@Component({
  selector: 'app-asset-information',
  templateUrl: './asset-information.component.html',
  styleUrls: ['./asset-information.component.scss'],
  standalone: true,
  imports: [
    DataTableComponent,
    TranslateModule,
    CommonModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatButtonModule,
    CancelButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    AddManualComponent,
    DataRetrievalMinistryJusticeComponent,
    DialogDataRetrievalMinistryJusticeComponent,
    SharedButtonComponent,
    AlertComponent,
    TestTableComponent,
  ],
})
export class AssetInformationComponent implements OnInit, AfterViewInit {
  @Input() isOneRealEstate: boolean = true;
  @Input() requestValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
  @Output() callParrentToGoToNextStep: EventEmitter<void> =
    new EventEmitter<void>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
  @ViewChild(AddManualComponent) childComponent!: AddManualComponent;

  isShowAddManual: boolean = false;
  isShowJusticeReturnData: boolean = true;
  dataSourceAssetInformation: AssetInformation[] | undefined = [];
  valuationRequestInformation!: ValuationRequestInformation;
  displayedColumns: { [index: string]: any } = {
    ownershipNumber: 'assetInformation.assetDeedNumber',
    realestateTypeName: 'assetInformation.subjectAssetTypeTable',
    realestateUsageName: 'assetInformation.currentUsageSubjectAssetTable',
    googleExtraInfo: 'assetInformation.assetLocation',
    realestateArea: 'assetInformation.areaSize',
    realestateAgeDays: 'assetInformation.assetAge',
    ownershipFilePath: 'assetInformation.assetDeedDocumentTable',
  };
  isFilter: boolean = false;
  messageError: string = 'assetInformation.multipleAssetInformationValuation';
  typeError: string = 'alert-danger';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    eventService: EventService
  ) {
    eventService.listen('addAsset', () => {
      this.valuationRequestInformation = JSON.parse(
        localStorage.getItem('valuationRequestInformation')!
      );
      this.dataSourceAssetInformation =
        this.valuationRequestInformation.realEstateDTOList;
    });
  }

  ngOnInit() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
  }

  childEventAsset() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
  }

  ngAfterViewInit() {
    // childComponent is now available
  }

  openDialog() {
    let dialogRef = this.dialog.open(
      DialogDataRetrievalMinistryJusticeComponent,
      { data: { isOneRealEstate: this.isOneRealEstate } }
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  submitForm() {
    if (this.isOneRealEstate) this.childComponent.addAsset();
    this.callParrentToGoToNextStep.emit(undefined);
  }

  goToBack() {
    this.callParrentToGoToPrevStep.emit(undefined);
  }

  updateChildInput(value: boolean) {
    this.isShowAddManual = value;
  }

  updateChildJusticeReturnData(value: boolean) {
    this.isShowJusticeReturnData = value;
  }
}
