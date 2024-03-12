import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CancelButtonComponent } from '@taqeem-workspace/general-lib';
import { ValuationRequestInformationValidation } from '../../../models/valuation-request-information-validation';
export interface DialogData {
  appNumber: string;
}

@Component({
  selector: 'app-done-add-evaluation-request-realestate',
  templateUrl: './done-add-evaluation-request-realestate.component.html',
  styleUrls: ['./done-add-evaluation-request-realestate.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CancelButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class DoneAddEvaluationRequestRealestateComponent
  implements OnInit, OnChanges
{
  @Output() callParrentToGoToNextStep: EventEmitter<string> =
    new EventEmitter<string>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
  @Input() appNumber: string = '';

  // appNumber: string = '';

  constructor(private router: Router) {} // @Inject(MAT_DIALOG_DATA) public data: DialogData // public dialogRef: MatDialogRef<any>, // public dialog: MatDialog,

  ngOnInit() {
    // this.appNumber = localStorage.getItem('appNumber')!;
  }
  ngOnChanges() {
    // this.appNumber = localStorage.getItem('appNumber')!;
  }

  goToHome() {
    this.router.navigate(['home']);
  }
  goToDetails() {
    this.router.navigate(['details']);
  }
}
