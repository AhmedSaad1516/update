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
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';
import { ChangeDirService } from '../../services/change-dir.service';

@Component({
  selector: 'app-shared-quill',
  templateUrl: './shared-quill.component.html',
  styleUrls: ['./shared-quill.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  providers: [ChangeDirService],
})
export class SharedQuill implements OnInit {
  @Input() placehoder: string = '';
  @Input() label: string = '';
  @Input() controlF: FormControl = new FormControl();
  content = new FormControl('', [Validators.required]);

  Editor: any;
  isBrowser = false;
  isloaded = false;
  public QuillConfiguration: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public service: ChangeDirService
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      import('quill-better-table').then((QuillBetterTable) => {
        import('quill')
          .then((quill) => {
            quill.default.register({
              'modules/better-table': QuillBetterTable,
            });

            this.QuillConfiguration = {
              'better-table': {
                operationMenu: {
                  items: {
                    unmergeCells: {
                      text: 'Another unmerge cells name',
                    },
                  },
                  color: {
                    colors: [
                      '#00F',
                      'rgb(0, 0, 255)',
                      'rgba(0, 0, 255, 0.6)',
                      'transparent',
                      'initial',
                      'inherit',
                    ],
                    text: 'Change cell color',
                  },
                },
              },
              keyboard: {
                bindings: QuillBetterTable.keyboardBindings,
              },
              syntax: false,

              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ header: 1 }, { header: 2 }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],
                ['link', 'image', 'video'],
                ['better-table'],
              ],
            };

            this.isloaded = true;
          })
          .finally(() => {
            this.isloaded = true;
          });
      });
    }
  }
  onChange(e: any) {}
  onReady(e: any) {}
}
