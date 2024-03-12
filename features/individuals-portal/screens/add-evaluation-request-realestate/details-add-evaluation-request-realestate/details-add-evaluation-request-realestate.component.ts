import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DialogConfirmationComponent,
  SharedButtonComponent,
  SideNavComponent,
  TitleFormComponent,
} from '@taqeem-workspace/general-lib';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewAddEvaluationRequestRealestateComponent } from '../review-add-evaluation-request-realestate/review-add-evaluation-request-realestate.component';
import { MatIconModule } from '@angular/material/icon';
import {
  MatStepper,
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { availableAction, stepperList } from '../../../data/dummy-test-data';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AddEvaluationRequestRealestateService } from '../../../services/add-evaluation-request-realestate.service';
import { KeycloakService } from '../../../services/keycloak.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { ValuationRequestInformation } from '../../../models/valuation-request-information';
import { getValuationRequestRealestateState } from '../../state/valuation-request-realestate.selector';
import { loadValuationRequestRealestate } from '../../state/valuation-request-realestate.actions';
@Component({
  selector: 'app-details-add-evaluation-request-realestate',
  templateUrl: './details-add-evaluation-request-realestate.component.html',
  styleUrls: ['./details-add-evaluation-request-realestate.component.scss'],
  standalone: true,
  imports: [
    SideNavComponent,
    TitleFormComponent,
    ReviewAddEvaluationRequestRealestateComponent,
    TranslateModule,
    MatStepperModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SharedButtonComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class DetailsAddEvaluationRequestRealestateComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  isLinear = true;
  stepperOrientation!: Observable<StepperOrientation>;

  // stepperData: any[] = stepperList;
  stepperData!: any;

  completed: boolean = false;
  oneValuationRequestInformation!: Observable<ValuationRequestInformation[]>;
  state: string = '';
  appNumber!: any;
  rootProcessInstanceId!: any;
  textBtn: string = 'قبول العرض';
  countBtn: number = 0;
  isCancel: boolean = false;
  // actionRequest: any = availableAction.data;
  actionRequest: any;
  objectKeys = Object.keys;
  constructor(
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    private getKeycloakService: KeycloakService,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getToken();
    this.countBtn = 0;
    this.appNumber = localStorage.getItem('appNumber');
    this.rootProcessInstanceId = localStorage.getItem('rootProcessInstanceId');

    // this.stepperData = this.stepperData.sort(
    //   (a: any, b: any) => a.stepDto.stepOrder - b.stepDto.stepOrder
    // );
  }

  getStepper() {
    this.addEvaluationRequestRealestateService
      .getStepper(this.appNumber)
      .subscribe(
        async (response: any) => {
          this.stepperData = {
            data: response.data.sort(
              (a: any, b: any) => a.stepDto.stepOrder - b.stepDto.stepOrder
            ),
          };
        },
        (error: Error) => {}
      );
  }

  getActionStepper() {
    this.addEvaluationRequestRealestateService
      .getActionStepper(this.appNumber)
      .subscribe(
        async (response: any) => {
          this.actionRequest = response.data;
        },
        (error: Error) => {}
      );
  }

  getToken() {
    localStorage.setItem('access_token', '');
    this.getKeycloakService.getToken().subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        setTimeout(() => {
          this.getStepper();
          this.getActionStepper();
          this.oneValuationRequestInformation = this.store.select(
            getValuationRequestRealestateState
          );
          this.store.dispatch(
            loadValuationRequestRealestate({ appNumber: this.appNumber })
          );
          this.getIsCancelled();
        }, 100);
      },
      (error: any) => {}
    );
  }

  cancelEvaluationRequestRealestate() {
    this.addEvaluationRequestRealestateService
      .cancelValuationRequestInformation(
        this.appNumber,
        this.rootProcessInstanceId
      )
      .subscribe(
        async (response: any) => {
          setTimeout(() => {
            this.oneValuationRequestInformation = this.store.select(
              getValuationRequestRealestateState
            );
            this.store.dispatch(
              loadValuationRequestRealestate({ appNumber: this.appNumber })
            );
            this.getIsCancelled();
          }, 100);
        },
        (error: Error) => {}
      );
  }

  addStepper() {
    this.addEvaluationRequestRealestateService
      .postStepper(this.appNumber, this.rootProcessInstanceId)
      .subscribe(
        async (response: any) => {
          setTimeout(() => {
            this.getStepper();
          }, 3000);
        },
        (error: Error) => {}
      );
  }

  cancelRequest() {
    this.openDialog();
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'addEvaluationRequestRealestate.confirmationCancelTitle',
        description:
          'addEvaluationRequestRealestate.confirmationCancelDescrption',
        btnCancelText: 'shared.cancel',
        btnSubmitText: 'shared.approval',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isCancel = result;
      if (this.isCancel) {
        this.cancelEvaluationRequestRealestate();
      }
    });
  }

  getIsCancelled() {
    this.oneValuationRequestInformation.subscribe((result) => {
      result[0].applicationRequestDTO?.applicationStatus?.code === 'Cancelled'
        ? (this.isCancel = true)
        : (this.isCancel = false);
    });
  }
}
