import { Component, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  CancelButtonComponent,
  EventService,
} from '@taqeem-workspace/general-lib';
import { ValuationRequestInformation } from '../../../../models/valuation-request-information';
import { AddManualComponent } from '../add-manual/add-manual.component';
export interface DialogData {
  isOneRealEstate: boolean;
  isShowJusticeReturnData: boolean;
}
@Component({
  selector: 'app-dialog-add-manual',
  templateUrl: './dialog-add-manual.component.html',
  styleUrls: ['./dialog-add-manual.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AddManualComponent,
    CancelButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
})
export class DialogAddManualComponent implements OnInit {
  valuationRequestInformation!: ValuationRequestInformation;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('80%', '98%');
  }

  childEventAsset() {
    this.eventService.emit('addAsset', this.valuationRequestInformation);
    this.dialogRef.close();
  }
}
