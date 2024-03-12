import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { AssetInformation } from '../../../individuals-portal/models/asset-information';
import { ValuationRequestInformation } from '../../../individuals-portal/models/valuation-request-information';
import { ValuationRequestInformationValidation } from '../../../individuals-portal/models/valuation-request-information-validation';
import { AddQualificationComponent } from './add-qualification/add-qualification.component';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Add this line
import { MatTableModule } from '@angular/material/table';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { GenericEvaluatorsService } from '../../../../shared/services/generic-evaluators.service';

import {
  AlertComponent,
  CancelButtonComponent,
  DataTableComponent,
  EventService,
  SharedButtonComponent,
  TestTableComponent,
} from '@taqeem-workspace/general-lib';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';
import { UserApplicationMockService } from '../services/user-application.mock.service';
import { json } from 'stream/consumers';

interface Qualification {
    id: 1,
    odooId: null,
    verified: false,
    attachmentIds: [],
    universityName: string,
    facultyName: string,
    degree: string,
    major: string,
    minor: string,
    studyType: string,
    moe: boolean,
    selected:boolean
}

@Component({
  selector: 'app-done-add-qualification',
  templateUrl: './done-add-qualification.component.html',
  styleUrls: ['./done-add-qualification.component.scss'],
  standalone: true,

  imports: [
    DataTableComponent,
    TranslateModule,
    CommonModule,
    MatTableModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatCheckboxModule,
    MatButtonModule,
    CancelButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    AddQualificationComponent,
    SharedButtonComponent,
    AlertComponent,
    TestTableComponent,
    
  ],
})
export class DoneAddQualificationComponent implements OnInit,AfterViewInit {
  @Input() isOneRealEstate: boolean = true;
  @Input() requestValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();
  @Output() callParrentToGoToNextStep: EventEmitter<void> =
    new EventEmitter<void>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();

  isShowAddManual: boolean = false;
  isShowJusticeReturnData: boolean = true;
  dataSourceAssetInformation: AssetInformation[] | undefined = [];
  valuationRequestInformation!: ValuationRequestInformation;
  responseSuccess: boolean = false;
  allUserData:any;
  isFilter: boolean = false;
  messageError: string = 'assetInformation.multipleAssetInformationValuation';
  typeError: string = 'alert-danger';
  loader:boolean=true;
  displayedColumns: string[] = ['select', 'universityName', 'facultyName', 'degree', 'details'];
  qualificationData: Qualification[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    eventService: EventService,
    private sharedStateService: SharedStateService,
    private SpinnerService: SpinnerService,
    private userApplicationService: UserApplicationMockService,
    private genericEvaluatorsService: GenericEvaluatorsService,


  ) {
    // eventService.listen('addAsset', () => {
    //   this.valuationRequestInformation = JSON.parse(
    //     localStorage.getItem('valuationRequestInformation')!
    //   );
    //   this.dataSourceAssetInformation =
    //     this.valuationRequestInformation.realEstateDTOList;
    // });
    // this.userApplicationService.getUserApplication().subscribe((data) => {
    //   this.allUserData = data;
    //   setTimeout(() => {
    //     console.log('fffffffff--',this.allUserData);
        
    //     this.qualificationData = data.educationalCertificates
    //     console.log('///////--',this.qualificationData);
    //     if(this.qualificationData){
    //       console.log('educationalCertificates------',this.qualificationData);
    //       this.loader=false;
    //       this.responseSuccess=true;            
    //          this.selectAllItems(true)
    //     }
    //     else{
    //       this.responseSuccess=false;
    //       this.loader=false;
    //     }
    //   }, 8000); 
    // });

    // this.sharedStateService.getData().subscribe(data => {
    //   this.allUserData = data;
    //   console.log('kkkkk',data);  
    //     setTimeout(() => {
    //     console.log('fffffffff--',this.allUserData);
    //     this.qualificationData = this.allUserData.allUserData.data.educationalCertificates
    //     localStorage.setItem('educationalCertificates', JSON.stringify(this.qualificationData));
    //     console.log('///////--',this.qualificationData);
    //     if(this.qualificationData){
    //       console.log('educationalCertificates------',this.qualificationData);
    //       this.loader=false;
    //       this.responseSuccess=true;            
    //          this.selectAllItems(true)
    //     }
    //     else{
    //       this.responseSuccess=false;
    //       this.loader=false;
    //     }
    //   }, 3000);      
      
    // });

    this.getEducationalCertificates()
  }

  ngOnInit() {
    // this.valuationRequestInformation = JSON.parse(
    //   localStorage.getItem('valuationRequestInformation')!
    // );
 
  }
  ngAfterViewInit() {
    console.log('aferview6666');
    
  }
  childEventAsset() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
  }

  getUserApplicationData(): void {
    this.userApplicationService.getUserApplication().subscribe((data) => {
      this.allUserData = data;
      const educationalCertificates = localStorage.getItem('educationalCertificates');
      this.qualificationData = educationalCertificates ? JSON.parse(educationalCertificates) : [];
    });
  }

  submitForm() {
    // if (this.isOneRealEstate) this.childComponent.addAsset();
    // this.callParrentToGoToNextStep.emit(undefined);
    const educationalCertificates = localStorage.getItem('educationalCertificates');
    this.qualificationData = educationalCertificates ? JSON.parse(educationalCertificates) : [];
    let body = {
      certificates: this.qualificationData
    };
    console.log('--- body', body);
  
    this.genericEvaluatorsService
      .post<Qualification>('educational-certificate', body)
      .subscribe(
        (data) => {
          console.log('educational-certificate success---',data);
          this.callParrentToGoToNextStep.emit();
        },
        (error) => {
          if(error){
          }
        }
      );
  }

  goToBack() {
    // this.callParrentToGoToPrevStep.emit(undefined);
    this.callParrentToGoToPrevStep.emit();
  }

  updateChildInput(value: boolean) {
    this.isShowAddManual = value;
  }

  updateChildJusticeReturnData(value: boolean) {
    this.isShowJusticeReturnData = value;
  }

  selectAllItems(checked:boolean) {
    this.qualificationData.forEach(item => item.selected = checked);
  }

  deleteSelected(id:any) {
    // this.qualificationData = this.qualificationData.filter(item => !item.selected);
    this.genericEvaluatorsService
    .delete('educational-certificate/'+id)
    .subscribe(
      (data) => {
        console.log('educational-certificate success---',data);
        this.callParrentToGoToNextStep.emit();
      },
      (error) => {
        if(error){
        }
      }
    );
  }
  openDialog() {
    const item = null
    let dialogRef = this.dialog.open(
      AddQualificationComponent,
      {   data: {
        item,
      type:'add'
      }  });
    dialogRef.afterClosed().subscribe((result) => {
      this.getUserApplicationData()
      console.log('********************');
      
    });
  }
  updateSelected(item: Qualification){
    console.log(item);
    const selectedItems = this.qualificationData.filter(item => item.selected);
    const dialogRef = this.dialog.open(AddQualificationComponent, {
      data: {
        item,
      type:'update'
      } 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('********************');
      this.getUserApplicationData()
    });
    }
  showDetails(item: Qualification) {
    console.log(item);
    const selectedItems = this.qualificationData.filter(item => item.selected);
    const dialogRef = this.dialog.open(AddQualificationComponent, {
      data: {
        item,
      type:'preview'
      } 
    });
    console.log('90000--',selectedItems[0]);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  // getEducationalCertificates(){
  //   setTimeout(() => {
  //     console.log('fffffffff--',this.allUserData);
      
  //     this.qualificationData = this.allUserData.allUserData.data.educationalCertificates
  //     console.log('///////--',this.qualificationData);
  //     if(this.qualificationData){
  //       console.log('educationalCertificates------',this.qualificationData);
  //       this.loader=false;
  //       this.responseSuccess=true;            
  //          this.selectAllItems(true)
  //     }
  //     else{
  //       this.responseSuccess=false;
  //       this.loader=false;
  //     }
  //   }, 8000);
  // }

  getEducationalCertificates() {
    this.genericEvaluatorsService.get<any>('educational-certificate').subscribe(
     (data) => {
       this.loader=true
       setTimeout(() => {
         this.qualificationData = data
         if(this.qualificationData){
           this.responseSuccess=false;
           this.loader=false;
         }
       }, 3000);
     },
     (error) => {
       this.responseSuccess=false;
       this.loader=false;
     }
   );
 }
}
