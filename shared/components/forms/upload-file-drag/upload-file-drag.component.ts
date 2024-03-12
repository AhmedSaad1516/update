import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { fileSizeFloor } from '../../../pipes/file-size-floor.pipe';
@Component({
  selector: 'app-upload-file-drag',
  templateUrl: './upload-file-drag.component.html',
  styleUrls: ['./upload-file-drag.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
    DragDropModule,
    MatProgressSpinnerModule,
    fileSizeFloor,
  ],
  providers: [],
})
export class UploadFileDragComponent {
  constructor(private translateService: TranslateService) {
    // this.myfilename = this.translateService.instant('shared.notSelectFile');
  }

  files: File[] = [];

  @Input() showProgressBar: boolean = false;
  @Input() progress: number = 0;
  @Input() error: string = '';
  @Input() label: string | undefined;

  @Output() onFilesSelectedEvent = new EventEmitter<File[]>();
  allowedFileTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
  isRequiredValidator: boolean = false;

  // ngOnInit() {
  //   this.isRequiredValidator = this.isRequired();
  // }

  private isAllowedExtension(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return (
      extension === 'doc' ||
      extension === 'docx' ||
      extension === 'xls' ||
      extension === 'xlsx' ||
      extension === 'pdf' ||
      extension === 'png' ||
      extension === 'jpeg' ||
      extension === 'jpg'
    );
  }
  onFileSelected($event: any) {
    const selectedFiles = $event.target.files as FileList;
    const filteredFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles.item(i) as File;

      if (
        this.allowedFileTypes.includes(file.type) ||
        this.isAllowedExtension(file.name) ||
        file.size <= this.maxFileSize
      ) {
        filteredFiles.push(file);
      }
    }

    this.files.push(...filteredFiles);
    this.onFilesSelectedEvent.emit(this.files);
  }
  mode: ProgressSpinnerMode = 'determinate';
  color: ThemePalette = 'primary';

  clearCurrentFile(index: number) {
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}
