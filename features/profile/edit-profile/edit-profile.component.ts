import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  HorizontalFooterComponent,
  HorizontalHeaderComponent,
  SideNavComponent,
  UploadFileDragComponent,
} from '@taqeem-workspace/general-lib';
import { TitleFormComponent } from '../../../shared/components/forms/title-form/title-form.component';
// import { sectorCardList } from '../individuals-portal/data/dummy-test-data';
import { evaluatorsCardList, sectorCardList, widgetCardListHome } from '../../individuals-portal/data/dummy-test-data';
import { MatTabsModule } from '@angular/material/tabs';

import {
  SectorCardComponent,
  EvaluatorsCardModel,
  WidgetCardModel,
  WidgetCardComponent,
} from '@taqeem-workspace/general-lib';
import { EvaluatorsCardComponent } from '../../../../../../../libs/general/src/lib/components/views/evaluators-card/evaluators-card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedStateService } from '../../../shared/services/shared-state.service';
import { ChoosingEvaluatorsImageProfileComponent } from '../../evaluators-portal/evaluators-portal-request/choosing-evaluators-image-profile/choosing-evaluators-image-profile.component';
import { AddImageProfileComponent } from '../../evaluators-portal/evaluators-portal-request/choosing-evaluators-image-profile/add-image-profile/add-image-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from '../../../shared/components/forms/input-field/input-field.component';
import { SharedButtonComponent } from '../../../shared/components/forms/shared-button/shared-button.component';
import { InputGroupComponent } from '../../../shared/components/forms/input-group/input-group.component';
import { EditPersonalInfoComponent } from '../edit-personal-info/edit-personal-info.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';// import { AddEvaluationRequestRealestateComponent } from './screens/add-evaluation-request-realestate/add-evaluation-request-realestate.component';
import { InputValidation } from '../../../shared/utils/InputValidation';
import { DoneAddQualificationComponent } from '../../evaluators-portal/evaluators-portal-request/done-add-qualification/done-add-qualification.component';
import { DoneAddCertificationRequestRealestateComponent } from '../../evaluators-portal/evaluators-portal-request/done-add-certification-request-realestate/done-add-certification-request-realestate.component';
import { DoneAddNationalAddressComponent } from '../done-add-national-address/done-add-national-address.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [
    // AddEvaluationRequestRealestateComponent,
    CommonModule,
    HorizontalHeaderComponent,
    HorizontalFooterComponent,
    ChoosingEvaluatorsImageProfileComponent,
    MatTabsModule,
    MatCardModule,
    RouterOutlet,
    MatInputModule,
    InputFieldComponent,
    SharedButtonComponent,
    SideNavComponent,
    TitleFormComponent,
    TranslateModule,
    InputGroupComponent,
    SectorCardComponent,
    EvaluatorsCardComponent,
    AddImageProfileComponent,
    MatCheckboxModule,
    EditPersonalInfoComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    FormsModule,
    ReactiveFormsModule,
    UploadFileDragComponent,
    DoneAddQualificationComponent,
    DoneAddCertificationRequestRealestateComponent,
    DoneAddNationalAddressComponent
  ],
})
export class EditProfileComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  editCategory:any;
  form!: FormGroup;
  lang :any = localStorage.getItem('lang')
  phoneCode = [
    { id: 1, name: '+966' },
    { id: 2, name: '+249' },
    { id: 3, name: '+974' },
  ];
  constructor(private router: Router,
    private sharedStateService: SharedStateService,
    private translateService: TranslateService,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.sharedStateService.getData().subscribe(data => {
      if(data){
        this.editCategory = data;
      }
      else{
    this.router.navigate(['profile']);
      }
      
    });
    this.initForm();
  }

  initForm() {

    this.form = new FormGroup({
      FirstNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      SecondNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      GrandfatherNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      LastNameAr: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.ArabicRegx),
      ]),
      FirstNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      SecondNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      GrandfatherNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      LastNameEn: new FormControl(null, [
        Validators.required,
        Validators.pattern(InputValidation.EnglishRegx),
      ]),

      IDType: new FormControl(null, [Validators.required]),
      IDNumber: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      DOPGregorian: new FormControl(new Date(), [Validators.required]),
      DOPHijri: new FormControl(new Date(), [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      countryKey: new FormControl(1, [
        Validators.required,
        // Validators.pattern(InputValidation.MobileKSApattern),
      ]),  
      mobileNumber: new FormControl(null, [
        Validators.required,
        // Validators.pattern(InputValidation.MobileKSApattern),
      ]),
      passward: new FormControl(null, [
        Validators.required,
      ]),
      confirmPassward: new FormControl(null, [
        Validators.required,
      ]),
    });


  }
  goToHome() {
    this.router.navigate(['home']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
  openDialog() {
    this.dialog.open(this.dialogTemplate);
  }
}
