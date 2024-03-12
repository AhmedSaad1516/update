import { Component, OnInit } from '@angular/core';
import {
  HorizontalFooterComponent,
  HorizontalHeaderComponent,
  SideNavComponent,
} from '@taqeem-workspace/general-lib';
import { TitleFormComponent } from '../../shared/components/forms/title-form/title-form.component';
// import { sectorCardList } from '../individuals-portal/data/dummy-test-data';
import { evaluatorsCardList, sectorCardList, widgetCardListHome } from '../individuals-portal/data/dummy-test-data';

import {
  SectorCardComponent,
  EvaluatorsCardModel,
  WidgetCardModel,
  WidgetCardComponent,
} from '@taqeem-workspace/general-lib';
import { EvaluatorsCardComponent } from '../../../../../../libs/general/src/lib/components/views/evaluators-card/evaluators-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
// import { AddEvaluationRequestRealestateComponent } from './screens/add-evaluation-request-realestate/add-evaluation-request-realestate.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedStateService } from '../../shared/services/shared-state.service';
import { CommonModule } from '@angular/common';
import { AutoComplete } from '../../shared/components/forms/auto-complete/auto-complete.component';
import {  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    // AddEvaluationRequestRealestateComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HorizontalHeaderComponent,
    HorizontalFooterComponent,
    RouterOutlet,
    MatCheckboxModule,
    SideNavComponent,
    TitleFormComponent,
    TranslateModule,
    SectorCardComponent,
    EvaluatorsCardComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    AutoComplete,
  ],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  profileStatus = [
    { id: '1', name: 'حاصلة علي عضوية - أنثي - عبر أبشر' },
    { id: '2', name: 'عبر أبشر حاصل علي عضوية - ذكر' },
    { id: '3', name: 'عبر الرابط - غير حاصل علي عضوية' },
    { id: '4', name: 'حاصل علي عضوية - عبر الرابط' },
    { id: '5', name: 'مسجل عن طريق الرابط -المسستخدم مسجل في بوابة الأفراد فقط' },
    { id: '6', name: 'استرجاع البيانات -المسستخدم مسجل في بوابة الأفراد فقط' },
  ];

  constructor(private router: Router,
    private sharedStateService: SharedStateService
    ) {}

  ngOnInit() {
    this.form = new FormGroup({
      profileStatus: new FormControl(this.profileStatus[1].name),
    })
   console.log('-------', this.form.get('profileStatus')?.value);
   
  }

  goToHome() {
    this.router.navigate(['home']);
  }
  goToEdit(p:any) {
    this.sharedStateService.setData(p);
    this.router.navigate(['profile//edit']);
  }
  
  goToEditPersonalInfo() {
    this.router.navigate(['profile/editPersonalInfo']);
  }
  
}
