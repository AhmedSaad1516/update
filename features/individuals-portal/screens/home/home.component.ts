import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {
  SectorCardComponent,
  SectorCardModel,
  SideNavComponent,
  TitleFormComponent,
  WidgetCardModel,
  WidgetCardComponent,
} from '@taqeem-workspace/general-lib';
import { sectorCardList, widgetCardListHome } from '../../data/dummy-test-data';
import { KeycloakService } from '../../services/keycloak.service';
import { DoneAddEvaluationRequestRealestateComponent } from '../add-evaluation-request-realestate/done-add-evaluation-request-realestate/done-add-evaluation-request-realestate.component';
import { environment } from 'apps/individuals-app/src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    DoneAddEvaluationRequestRealestateComponent,
    SideNavComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslateModule,
    TitleFormComponent,
    SectorCardComponent,
    WidgetCardComponent,
  ],
})
export class HomeComponent implements OnInit {
  appNumber!: any;
  sectorCardListHome: SectorCardModel[] = sectorCardList;
  widgetCardListData: WidgetCardModel[] = widgetCardListHome;
  clientSecret = environment.clientSecret;

  constructor(
    public dialog: MatDialog,
    private getKeycloakService: KeycloakService
  ) {}

  ngOnInit() {
    // this.openDialog();
    this.getToken();
  }

  openDialog() {
    // this.router.navigate(['home']);
    let dialogRef = this.dialog.open(
      DoneAddEvaluationRequestRealestateComponent,
      { data: { appNumber: this.appNumber } }
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getToken() {
    localStorage.setItem('access_token', '');
    this.getKeycloakService.getToken().subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.appNumber = response;
      },
      (error: any) => {}
    );
  }
}
