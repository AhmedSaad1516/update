import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogAddManualComponent } from '../dialog-add-manual/dialog-add-manual.component';
import { DataRetrievalMinistryJusticeComponent } from '../data-retrieval-ministry-justice/data-retrieval-ministry-justice.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export interface DialogData {
  isOneRealEstate: boolean;
}

@Component({
  selector: 'app-dialog-data-retrieval-ministry-justice',
  templateUrl: './dialog-data-retrieval-ministry-justice.component.html',
  styleUrls: ['./dialog-data-retrieval-ministry-justice.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    DataRetrievalMinistryJusticeComponent,
  ],
})
export class DialogDataRetrievalMinistryJusticeComponent implements OnInit {
  destroyed = new Subject<void>();
  currentScreenSize: string = '';
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit() {
    if (
      this.currentScreenSize === 'XSmall' ||
      this.currentScreenSize === 'Small'
    )
      this.dialogRef.updateSize('100%', '55%');
    else this.dialogRef.updateSize('41%', '41%');
  }

  onNoClick(): void {
    let dialogRef = this.dialog.open(DialogAddManualComponent, {
      data: { name: 'Vishwas' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
