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
// import { AddEvaluationRequestRealestateComponent } from './screens/add-evaluation-request-realestate/add-evaluation-request-realestate.component';
@Component({
  selector: 'app-evaluators-portal',
  templateUrl: './evaluators-portal.component.html',
  styleUrls: ['./evaluators-portal.component.scss'],
  standalone: true,
  imports: [
    // AddEvaluationRequestRealestateComponent,
    HorizontalHeaderComponent,
    HorizontalFooterComponent,
    SideNavComponent,
    TitleFormComponent,
    TranslateModule,
    SectorCardComponent,
    EvaluatorsCardComponent
  ],
})
export class EvaluatorsPortalComponent implements OnInit {
  evaluatorsCardListHome: EvaluatorsCardModel[] = evaluatorsCardList;

  constructor() {}

  ngOnInit() {}
}
