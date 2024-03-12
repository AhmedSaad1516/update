import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { Router } from '@angular/router';
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
import { RequestDTO } from '../../../models/request-DTO';
import { ValuationRequestInformationValidation } from '../../../models/valuation-request-information-validation';
import { ValuationRequestInformation } from './../../../models/valuation-request-information';
import { AddEvaluationRequestRealestateService } from './../../../services/add-evaluation-request-realestate.service';
import { KeycloakService } from '../../../services/keycloak.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { getPurposeValuation } from '../../lookup-state/lookup.selector';
import { purposeValuation } from '../../lookup-state/lookup.actions';
import { fullValuationRequestRealestate } from '../../state/valuation-request-realestate.actions';
import { getValuationRequestRealestateState } from '../../state/valuation-request-realestate.selector';

@Component({
  selector: 'app-valuation-request-information',
  templateUrl: './valuation-request-information.component.html',
  styleUrls: ['./valuation-request-information.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    SelectFieldComponent,
    SharedButtonComponent,
    TextAreaComponent,
    RadioButtonComponent,
    CancelButtonComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    SharedCKEditor,
    DatePickerComponent,
  ],
})
export class ValuationRequestInformationComponent implements OnInit {
  @Output() callParrentToGoToNextStep: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output()
  callParrentToGoToPrevStep: EventEmitter<ValuationRequestInformationValidation> =
    new EventEmitter<ValuationRequestInformationValidation>();
  @Input() requestValidation: ValuationRequestInformationValidation =
    new ValuationRequestInformationValidation();

  infoEvaluationForm!: FormGroup;
  valuationRequestInformation!: ValuationRequestInformation;
  requestDTO!: RequestDTO;
  // purposeValuationList!: Lookup[];
  purposeValuationList!: Observable<Lookup[]>;
  omer!: Observable<any[]>;
  counter: number = 0;
  oneLookup!: Lookup | undefined;

  constructor(
    private fb: FormBuilder,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService,
    private router: Router,
    private getKeycloakService: KeycloakService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.counter = 0;
    this.initForm();
    this.getToken();
    // setTimeout(() => {
    //   this.getLookup();
    // }, 500);
  }

  initForm() {
    this.infoEvaluationForm = new FormGroup({
      valuationTitle: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      purposeValuationId: new FormControl('1', Validators.required),
      cancellationDurationValuationDate: new FormControl(
        '',
        Validators.required
      ),
      isOneAsset: new FormControl(true, Validators.required),
    });
  }

  fullForm() {
    this.getLookup();
    this.requestDTO = {
      valuationTitle: this.infoEvaluationForm.get('valuationTitle')?.value,
      purposeValuationCode:
        this.infoEvaluationForm.get('purposeValuationId')?.value,
      purposeValuation: this.oneLookup,
      applicationType: 'Evaluation',
      customerId: 232323,
      cancellationDurationValuationDate: this.infoEvaluationForm.get(
        'cancellationDurationValuationDate'
      )?.value,
      description: this.infoEvaluationForm.get('description')?.value,
      isOneAsset: this.infoEvaluationForm.get('isOneAsset')?.value,
    };
    this.valuationRequestInformation = {
      applicationRequestDTO: this.requestDTO,
    };
    this.callParrentToGoToNextStep.emit(
      this.infoEvaluationForm.get('isOneAsset')?.value
    );
    this.store.dispatch(
      fullValuationRequestRealestate({
        valuationRequestInformation: this.valuationRequestInformation,
      })
    );
    localStorage.setItem(
      'valuationRequestInformation',
      JSON.stringify(this.valuationRequestInformation)
    );
  }

  getLookup() {
    this.purposeValuationList
      .pipe(
        map((objects) =>
          objects.find(
            (obj) =>
              obj.code ===
              this.infoEvaluationForm.get('purposeValuationId')?.value
          )
        )
      )
      .subscribe((obj) => {
        this.oneLookup = obj;
      });
  }

  findObjectById(code: string): Observable<Lookup | undefined> {
    return this.purposeValuationList.pipe(
      map((objects) => objects.find((obj) => obj.code === code))
    );
  }

  getFormGroup(contralName: string): FormControl {
    return this.infoEvaluationForm?.get(contralName) as FormControl;
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  getLookup10() {
    this.addEvaluationRequestRealestateService
      .getPurposeValuationLookup()
      .subscribe(
        async (response: any) => {
          this.purposeValuationList = await response;
        },
        (error: Error) => {
          this.counter++;
          if (this.counter < 5) this.getLookup10();
        }
      );
  }

  getToken() {
    localStorage.setItem('access_token', '');
    this.getKeycloakService.getToken().subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.purposeValuationList = this.store.select(getPurposeValuation);
        this.store.dispatch(purposeValuation());
      },
      (error: any) => {}
    );
  }
}
