import { Component, Inject, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss',
})
export class CustomAlertComponent {
  @Input() srcLink: string = '';
  status: string = '';

  constructor(
    public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,

  ) {
    console.log(this.data)
    
  }

  close(){
    this.dialogRef.close();

  }
}
