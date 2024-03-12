import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ChangeDirService } from '../../services/change-dir.service';

import { TranslateModule } from '@ngx-translate/core';
// import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

@Component({
  selector: 'app-shared-ckeditor',
  templateUrl: './shared-ckeditor.component.html',
  styleUrls: ['./shared-ckeditor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatIconModule,
    TranslateModule,
  ],
  providers: [ChangeDirService],
})
export class SharedCKEditor implements OnInit {
  @Input() placehoder: string = '';
  @Input() label: string = '';
  @Input() error: string = '';
  @Input() controlF: FormControl = new FormControl();
  content = new FormControl('', [Validators.required]);
  config = {};

  Editor: any;
  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public service: ChangeDirService
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      import('@ckeditor/ckeditor5-build-classic').then((editorModule) => {
        this.Editor = editorModule.default;
        // this.Editor.plugins = Base64UploadAdapter;
        // this.Editor.ui.powerBy.forceVisible = false;
        // this.Editor.create(document.querySelector('#editor'), {
        //   Base64UploadAdapter,
        // });
        // this.Editor.create(document.querySelector('#editor'), {
        //   plugins: [Base64UploadAdapter],
        // });
        // document.querySelector('#editor'),
        //   {
        //     plugins: [Base64UploadAdapter],
        //   };
        // this.Editor.plugins.get('FileRepository').createUploadAdapter = (
        //   loadeany, uploadany
        // ) => {
        //   console.log(btoa(loader.file));
        //   return new Base64UploadAdapter(loader); // UploadAdapter(loader);
        // };
      });
    }
    this.config = {
      placeholder: this.placehoder,
      language: this.service.langStorage,
      simpleUpload: {
        uploadUrl: {
          url: 'data:image/jpeg;base64,',
        },
      },
      // fileRepository: {
      //   // Specify the upload adapter
      //   uploadAdapter: {
      //     types: ['image/jpeg', 'image/png'],
      //     endpoint: '../../../../assets/img', // Replace with your actual upload URL
      //   },
      // },
      // ui: { poweredBy: { forceVisible: false } },
      // plugins: [Base64UploadAdapter],
      // builtinPlugins: [Base64UploadAdapter],
      // ckfinder: {
      //   options: {
      //     resourceType: 'Images',
      //   },
      // },
      // plugins: [Base64UploadAdapter],
    };
  }
  onChange(e: any) {}
  onReady(e: any) {}
}
