import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Inject,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  CancelButtonComponent,
  CheckboxComponent,
  InputFieldComponent,
  Lookup,
  RadioButtonComponent,
  SelectFieldComponent,
  SharedButtonComponent,
  SharedCKEditor,
  TextAreaComponent,
} from '@taqeem-workspace/general-lib';
import { DatePickerComponent } from '../../../../../shared/components/forms/date-picker/date-picker.component';
import {
  GetDate,
  InputValidation,
  formatDate,
} from '../../../../../shared/utils/InputValidation';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { UploadFileDragComponent } from '../../../../../shared/components/forms/upload-file-drag/upload-file-drag.component';
import { UserApplicationMockService } from '../../services/user-application.mock.service';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
export interface DialogData {
  isOneRealEstate: boolean;
  isShowJusticeReturnData: boolean;
}

@Component({
  selector: 'app-add-certification',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MatSelectModule,
    UploadFileDragComponent,
    CancelButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    InputFieldComponent,
    CancelButtonComponent,
    CheckboxComponent,
    DatePickerComponent,
    InputFieldComponent,
    RadioButtonComponent,
    SelectFieldComponent,
    SharedButtonComponent,
    SharedCKEditor,
    TextAreaComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.scss'],
  providers: [
    BrowserAnimationsModule, // required animations module
  ],
})
export class AddCertificationComponent
  implements OnInit, OnChanges
{
  @Input() isOneRealEstate: boolean = true;
  @Output() isShowAddManual = new EventEmitter<boolean>();
  @Output() isShowJusticeReturnData = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() placeholder: string = 'اختار';
  @Input() error: string = '';
  @Input() hint: string = '';

  classTitle: string = 'fw-bold text-right pt-5 pb-5';
  fxFlexBtn: string = '26';
  returnData: FormGroup = new FormGroup({});
  isomer: boolean = true;
  colorAddManual: string = '';
  colorReturnData: string = 'primary';
  selectedOption:string=''
  options=[
    {name:'A',id:1},
    {name:'B',id:1},
    {name:'C',id:1},
    {name:'D',id:1},
]
certificationData:any
  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userApplicationService: UserApplicationMockService,
    public dialogRef: MatDialogRef<AddCertificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      if(data){
        this.certificationData=data.item;
       
      }
    }

  ngOnInit() {
    if(this.data.type=='preview'){
      this.initForm(this.certificationData);
      this.returnData.disable();
      }
      if(this.data.type=='update'){
        this.initForm(this.certificationData);
        }
      if(this.data.type=='add'){
        this.initForm(false);
        } 
       }

  ngOnChanges() {
    if (this.isOneRealEstate) {
      this.classTitle = 'fw-bold text-right pt-5 pb-5';
      this.fxFlexBtn = '26';
    } else {
      this.classTitle = 'fw-bold text-center pt-2 pb-2';
      this.fxFlexBtn = '48';
    }
  }

  initForm(data:any) {
    this.returnData = new FormGroup({
      name: new FormControl(data.name || null, Validators.required),
      sector: new FormControl(data.sector || null, Validators.required),
      membershiptId: new FormControl(data.membershiptId || null, Validators.required),
      issueDate:  new FormControl(new Date(), [Validators.required]),
      attachmentIds: this.formBuilder.array([]),
    });
  }
  addCertificationData() {
    const storedCertificates = localStorage.getItem('certificationData');
    let certificationData: any[] = [];
    
    if (storedCertificates) {
      certificationData = JSON.parse(storedCertificates);
    }
        const formData = this.returnData.value;
        const lastCertificate = certificationData[certificationData.length - 1];
const lastId = lastCertificate ? lastCertificate.id : 0;
    const newQualification = {
      id: lastId+1,
      attachmentIds: formData.attachmentIds,
      name: formData.name,
      sector: formData.sector,
      membershiptId: formData.membershiptId,
      issueDate: formData.issueDate,
    };
    // this.userApplicationService.addEducationalCertificate(newQualification);
const qualificationData = certificationData 
const newItem = newQualification
qualificationData.push(newItem);
const updatedData = JSON.stringify(qualificationData);
localStorage.setItem('certificationData', updatedData);
  this.closeDialog()
  }
  updateCertificationData() {
    const formData = this.returnData.value;
    const newQualification = {
      id: 1,
      attachmentIds: formData.attachmentIds,
      name: formData.name,
      sector: formData.sector,
      membershiptId: formData.membershiptId,
      issueDate: formData.issueDate,
    };
    this.updateCertificationDataFromLocalStorage(newQualification);



  this.closeDialog()
  }
  updateCertificationDataFromLocalStorage(certificate: any) {
    var certificationData: any[] = [];
    const storedCertificates = localStorage.getItem('certificationData');
  
    if (storedCertificates) {
      certificationData = JSON.parse(storedCertificates);
      const certificateIndex = certificationData.findIndex((c: any) => c.id === certificate.id);
      
      if (certificateIndex !== -1) {
        certificationData[certificateIndex] = certificate;
        console.log('Certificate updated successfully!');
        // Convert the updated array back to a string
        const updatedData = JSON.stringify(certificationData);
        // Store the updated array in local storage
        localStorage.setItem('certificationData', updatedData);
      } else {
        console.log('Certificate not found.');
      }
    } else {
      console.log('No certificates found in local storage.');
    }
  }
  submitForm() {}

  getFormGroup(contralName: string): FormControl {
    return this.returnData?.get(contralName) as FormControl;
  }

  onNoClick(isShowJustice: boolean): void {
 
  }
  handleSelected(): void {
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
