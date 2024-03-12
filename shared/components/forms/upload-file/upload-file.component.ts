import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class UploadFileComponent {
  myfilename = this.translateService.instant('shared.notSelectFile');

  constructor(private translateService: TranslateService) {
    this.myfilename = this.translateService.instant('shared.notSelectFile');
  }

  @Input() showProgressBar: boolean = false;
  @Input() progress: number = 0;
  @Input() label: String | undefined;

  @Output() onFileSelectedEvent = new EventEmitter<File>();

  onFileSelected($event: any) {
    const file = $event.target.files.item(0) as File;
    this.onFileSelectedEvent.emit(file);
    this.myfilename = file.name;
  }
}
