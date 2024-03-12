import { async } from '@angular/core/testing';
import { RequestDTO } from './../../../../models/request-DTO';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  AlertComponent,
  CancelButtonComponent,
  InputFieldComponent,
  SharedButtonComponent,
} from '@taqeem-workspace/general-lib';
import { DialogAddManualComponent } from '../dialog-add-manual/dialog-add-manual.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { addValuationRequestRealestate } from '../../../state/valuation-request-realestate.actions';
import { getPurposeValuation } from '../../../lookup-state/lookup.selector';
import { Observable } from 'rxjs';
import { ValuationRequestInformation } from '../../../../models/valuation-request-information';
import { getValuationRequestRealestateState } from '../../../state/valuation-request-realestate.selector';
@Component({
  selector: 'app-data-retrieval-ministry-justice',
  templateUrl: './data-retrieval-ministry-justice.component.html',
  styleUrls: ['./data-retrieval-ministry-justice.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    SharedButtonComponent,
    CancelButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    InputFieldComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
    AlertComponent,
  ],
})
export class DataRetrievalMinistryJusticeComponent
  implements OnInit, OnChanges
{
  @Input() isOneRealEstate: boolean = true;
  @Output() isShowAddManual = new EventEmitter<boolean>();
  @Output() isShowJusticeReturnData = new EventEmitter<boolean>();
  classTitle: string = 'fw-bold text-right pt-3 pb-4';
  fxFlexBtn: string = '33';
  returnData: FormGroup = new FormGroup({});
  isShow: boolean = false;
  colorAddManual: string = '';
  colorReturnData: string = 'primary';
  messageError: string =
    '<strong class="show-manual">لقد فشل الاتصال مع وزارة العدل الرجاء المحاولة مرة اخري او تعين الاصل يدويا <a (click)="onNoClick(false)">اضغط هنا</a></strong>';
  typeError: string = 'alert-danger';
  showSpinner: boolean = false;

  valuationRequestInformation!: Observable<ValuationRequestInformation[]>;
  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.isOneRealEstate) {
      this.classTitle = 'fw-bold text-right pt-3 pb-4';
      this.fxFlexBtn = '33';
    } else {
      this.classTitle = 'fw-bold text-center pt-2 pb-2';
      this.fxFlexBtn = '48';
    }
  }

  initForm() {
    this.returnData = new FormGroup({
      assetDeedNumber: new FormControl('', Validators.required),
    });
  }

  submitForm() {}

  getFormGroup(contralName: string): FormControl {
    return this.returnData?.get(contralName) as FormControl;
  }

  onNoClick(isShowJustice: boolean): void {
    if (isShowJustice) {
      this.showSpinner = true;
      setTimeout(() => {
        this.isShow = true;
        this.showSpinner = false;
      }, 500);
    } else {
      if (this.returnData.valid) {
        localStorage.setItem(
          'assetDeedNumber',
          this.returnData.get('assetDeedNumber')?.value
        );
        if (this.isOneRealEstate) {
          this.isShowAddManual.emit(true);
        } else {
          let dialogRef = this.dialog.open(DialogAddManualComponent, {
            data: {
              isOneRealEstate: this.isOneRealEstate,
              isShowJusticeReturnData: isShowJustice,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {});
        }
        this.isShowJusticeReturnData.emit(isShowJustice);
      } else {
        this.returnData.get('assetDeedNumber')?.markAsTouched();
      }
    }
  }
}
