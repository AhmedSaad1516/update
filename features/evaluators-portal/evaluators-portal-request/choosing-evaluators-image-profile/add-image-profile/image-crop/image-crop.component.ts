import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCropperComponent, ImageCropperModule, ImageTransform } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output ,ViewChild,TemplateRef, Inject,ElementRef, AfterViewInit, numberAttribute, Input} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import {
  AlertComponent,
  CancelButtonComponent,
  CheckboxComponent,
  DatePickerComponent,
  InputFieldComponent,
  Lookup,
  RadioButtonComponent,
  SelectFieldComponent,
  SelectionListViewComponent,
  SharedButtonComponent,
} from '@taqeem-workspace/general-lib';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    ImageCropperModule,
    MatDialogModule,
    TranslateModule,
    SharedButtonComponent,
    CancelButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    InputFieldComponent,
    SelectFieldComponent,
    RadioButtonComponent,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    SelectionListViewComponent,
    DatePickerComponent,
    AlertComponent,
    MatButtonModule
  ],
})

export class ImageCropComponent implements OnInit {
  @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;
  @Input({ transform: numberAttribute })
  value!: number 
  max: number = 2;
  zoom: number = 0;
  disabled = false;
//   max = 100;
  min = 0;
  showTicks = false;
  step = 0.1;
  thumbLabel = false;
//   value = 0;
  transform: ImageTransform = {};

  constructor(
    public dialogRef: MatDialogRef<ImageCropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: File }
  ) {}

  ngOnInit() {}

  onSliderChange() {
    console.log('---------',this.value);
    
    this.zoom = this.value;
    const scale = this.value >= 0 ? this.value + 1 : 1 - (this.value / this.max) * -1;
    this.transform = { scale };
  }

  onClose() {
    this.dialogRef.close();
  }

  onAccept() {
    const event = this.imageCropper.crop();
    this.dialogRef.close(event);
  }
}
