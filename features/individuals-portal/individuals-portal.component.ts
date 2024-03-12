import { Component, OnInit } from '@angular/core';
import {
  HorizontalFooterComponent,
  HorizontalHeaderComponent,
  SideNavComponent,
} from '@taqeem-workspace/general-lib';
import { AddEvaluationRequestRealestateComponent } from './screens/add-evaluation-request-realestate/add-evaluation-request-realestate.component';
@Component({
  selector: 'app-individuals-portal',
  templateUrl: './individuals-portal.component.html',
  styleUrls: ['./individuals-portal.component.scss'],
  standalone: true,
  imports: [
    AddEvaluationRequestRealestateComponent,
    HorizontalHeaderComponent,
    HorizontalFooterComponent,
    SideNavComponent,
  ],
})
export class IndividualsPortalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
