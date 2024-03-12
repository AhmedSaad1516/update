import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  CancelButtonComponent,
  CheckboxComponent,
  DatePickerComponent,
  InputFieldComponent,
  Lookup,
  RadioButtonComponent,
  SelectFieldComponent,
  SharedButtonComponent,
  SharedCKEditor,
  TextAreaComponent,
} from '@taqeem-workspace/general-lib';
import { InputValidation } from '../../../../../shared/utils/InputValidation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UploadFileDragComponent } from '../../../../../shared/components/forms/upload-file-drag/upload-file-drag.component';
import { UserApplicationMockService } from '../../services/user-application.mock.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    SharedButtonComponent,
    FormsModule,
    ReactiveFormsModule,
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
  ],
})
export class AddQualificationComponent
  implements OnInit, OnChanges
{
  @Input() isOneRealEstate: boolean = true;
  @Output() isShowAddManual = new EventEmitter<boolean>();
  @Output() isShowJusticeReturnData = new EventEmitter<boolean>();
  classTitle: string = 'fw-bold text-right pt-5 pb-5';
  fxFlexBtn: string = '26';
  returnData: FormGroup = new FormGroup({});
  isomer: boolean = true;
  colorAddManual: string = '';
  colorReturnData: string = 'primary';
  qualificationData:any;
  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userApplicationService: UserApplicationMockService,
    public dialogRef: MatDialogRef<AddQualificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      if(data){
        this.qualificationData=data.item;
       
      }
      
  }

  ngOnInit() {
    if(this.data.type=='preview'){
      this.initForm(this.qualificationData);
      this.returnData.disable();
      }
      if(this.data.type=='update'){
        this.initForm(this.qualificationData);
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
      universityName: new FormControl(data.universityName || null, Validators.required),
      facultyName: new FormControl(data.universityName || null, Validators.required),
      major: new FormControl(data.major || null, Validators.required),
      degree: new FormControl(data.degree || null, Validators.required),
      minor: new FormControl(data.minor || null, Validators.required),
      studyType: new FormControl(data.studyType || null, Validators.required),
      moe: new FormControl(data.moe || false, Validators.required),
      attachmentIds: this.formBuilder.array([]),
    });
  }

  addEducationalCertificate() {
    const storedCertificates = localStorage.getItem('educationalCertificates');
    let educationalCertificates: any[] = [];
    
    if (storedCertificates) {
      educationalCertificates = JSON.parse(storedCertificates);
    }
        const formData = this.returnData.value;
        const lastCertificate = educationalCertificates[educationalCertificates.length - 1];
const lastId = lastCertificate ? lastCertificate.id : 0;
    const newQualification = {
      id: lastId+1,
      attachmentIds: formData.attachmentIds,
      universityName: formData.universityName,
      facultyName: formData.facultyName,
      degree: formData.degree,
      major: formData.major,
      minor: formData.minor,
      studyType: formData.studyType,
      moe: formData.moe,
      selected: false,
    };
    // this.userApplicationService.addEducationalCertificate(newQualification);
const qualificationData = educationalCertificates 
const newItem = newQualification
qualificationData.push(newItem);
const updatedData = JSON.stringify(qualificationData);
localStorage.setItem('educationalCertificates', updatedData);
  this.closeDialog()
  }
  updateEducationalCertificate() {
    const formData = this.returnData.value;
    const newQualification = {
      id: 1,
      attachmentIds: formData.attachmentIds,
      universityName: formData.universityName,
      facultyName: formData.facultyName,
      degree: formData.degree,
      major: formData.major,
      minor: formData.minor,
      studyType: formData.studyType,
      moe: formData.moe,
      selected: false,
    };
    this.updateEducationalCertificateFromLocalStorage(newQualification);



  this.closeDialog()
  }
  updateEducationalCertificateFromLocalStorage(certificate: any) {
    var educationalCertificates: any[] = [];
    const storedCertificates = localStorage.getItem('educationalCertificates');
  
    if (storedCertificates) {
      educationalCertificates = JSON.parse(storedCertificates);
      const certificateIndex = educationalCertificates.findIndex((c: any) => c.id === certificate.id);
      
      if (certificateIndex !== -1) {
        educationalCertificates[certificateIndex] = certificate;
        console.log('Certificate updated successfully!');
        // Convert the updated array back to a string
        const updatedData = JSON.stringify(educationalCertificates);
        // Store the updated array in local storage
        localStorage.setItem('educationalCertificates', updatedData);
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
    if (this.returnData.valid) {
      localStorage.setItem(
        'assetDeedNumber',
        this.returnData.get('assetDeedNumber')?.value
      );
      if (isShowJustice) {
        this.colorAddManual = '';
        this.colorReturnData = 'primary';
      } else {
        this.colorAddManual = 'primary';
        this.colorReturnData = '';
      }
      if (this.isOneRealEstate) {
        this.isShowAddManual.emit(true);
      } 
      this.isShowJusticeReturnData.emit(isShowJustice);
    } else {
      this.returnData.get('assetDeedNumber')?.markAsTouched();
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
