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
import { GenericEvaluatorsService } from '../../../../shared/services/generic-evaluators.service';

import { MatCheckboxModule } from '@angular/material/checkbox'; // Add this line
import { MatTableModule } from '@angular/material/table';

import {
  AlertComponent,
  CancelButtonComponent,
  DataTableComponent,
  EventService,
  SharedButtonComponent,
  TestTableComponent,
} from '@taqeem-workspace/general-lib';
import { AddCertificationComponent } from './add-certification/add-certification.component';
import { UserApplicationMockService } from '../services/user-application.mock.service';
import { SharedStateService } from 'apps/individuals-app/src/app/shared/services/shared-state.service';

interface Qualification {
  universityName: string;
  collegeName: string;
  degree: string;
  selected: boolean;
  attachmentIds: [],
  membershiptId: string,
  issueDate:string
}

@Component({
  selector: 'app-done-add-certification-request-realestate',
  templateUrl: './done-add-certification-request-realestate.component.html',
  styleUrls: ['./done-add-certification-request-realestate.component.scss'],
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
   
    SharedButtonComponent,
    AlertComponent,
    TestTableComponent,
  ],
})
export class DoneAddCertificationRequestRealestateComponent
  implements OnInit
{
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

  isFilter: boolean = false;
  messageError: string = 'assetInformation.multipleAssetInformationValuation';
  typeError: string = 'alert-danger';
  allUserData:any;
  loader:boolean=true;

  displayedColumns: string[] = ['select', 'universityName', 'collegeName', 'degree', 'details'];
  certificationData: Qualification[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    eventService: EventService,
    private userApplicationService: UserApplicationMockService,
    private sharedStateService: SharedStateService,
    private genericEvaluatorsService: GenericEvaluatorsService,

  ) {
    // this.sharedStateService.getData().subscribe(data => {
    //   this.allUserData = data;
    //   console.log('kkkkk',data);  
    //     setTimeout(() => {
    //     console.log('fffffffff--',this.allUserData);
        
    //     this.certificationData = this.allUserData.allUserData.data.globalCertificates
    //     localStorage.setItem('globalCertificates', JSON.stringify(this.certificationData));

    //     console.log('///////--',this.certificationData);
    //     if(this.certificationData){
    //       console.log('globalCertificates------',this.certificationData);
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
    this.getCertificate()
  }

  ngOnInit() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
    this.selectAllItems(true)
  }

  childEventAsset() {
    this.valuationRequestInformation = JSON.parse(
      localStorage.getItem('valuationRequestInformation')!
    );
  }

  ngAfterViewInit() {
    // childComponent is now available
  }

  openDialog() {
    const item = null
    let dialogRef = this.dialog.open(
      AddCertificationComponent,
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
    const selectedItems = this.certificationData.filter(item => item.selected);
    const dialogRef = this.dialog.open(AddCertificationComponent, {
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
    const selectedItems = this.certificationData.filter(item => item.selected);
    const dialogRef = this.dialog.open(AddCertificationComponent, {
      data: {
        item,
      type:'preview'
      } 
    });
    console.log('90000--',selectedItems[0]);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getUserApplicationData(): void {
    this.userApplicationService.getUserApplication().subscribe((data) => {
      this.allUserData = data;
      const globalCertificates = localStorage.getItem('globalCertificates');
      this.certificationData = globalCertificates ? JSON.parse(globalCertificates) : [];
    });
  }

  submitForm() {
    // if (this.isOneRealEstate) this.childComponent.addAsset();
        const educationalCertificates = localStorage.getItem('globalCertificates');
    this.certificationData = educationalCertificates ? JSON.parse(educationalCertificates) : [];
    let body = {
      certificates: this.certificationData
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
    this.callParrentToGoToPrevStep.emit();
  }

  updateChildInput(value: boolean) {
    this.isShowAddManual = value;
  }

  updateChildJusticeReturnData(value: boolean) {
    this.isShowJusticeReturnData = value;
  }

  selectAllItems(checked: boolean) {
    this.certificationData.forEach(item => item.selected = checked);
  }


  deleteSelected(id:any) {
    // this.qualificationData = this.qualificationData.filter(item => !item.selected);
    this.genericEvaluatorsService
    .delete('global-certificate/'+id)
    .subscribe(
      (data) => {
        console.log('global-certificate success---',data);
        this.callParrentToGoToNextStep.emit();
      },
      (error) => {
        if(error){
        }
      }
    );
  }
  getCertificate() {
    this.genericEvaluatorsService.get<any>('global-certificate/all').subscribe(
     (data) => {
       this.loader=true
       setTimeout(() => {
         this.certificationData = data
         if(this.certificationData){
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
