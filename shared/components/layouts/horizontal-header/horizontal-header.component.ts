import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ChangeDirService } from '../../../services/change-dir.service';
import { InputFieldComponent } from '../../forms/input-field/input-field.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horizontal-header',
  templateUrl: './horizontal-header.component.html',
  styleUrls: ['./horizontal-header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslateModule,
    InputFieldComponent,
    MatGridListModule,
  ],
  providers: [ChangeDirService],
})
export class HorizontalHeaderComponent implements OnInit {
  destroyed = new Subject<void>();
  currentScreenSize: string = '';
  containerFluid: string = 'bg-white';

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    public changeLangService: ChangeDirService,
    breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit() {
    if (
      this.currentScreenSize === 'XSmall' ||
      this.currentScreenSize === 'Small'
    )
      this.containerFluid = 'bg-white';
    else this.containerFluid = 'bg-white container-fluid';
  }

  changeLang() {
    this.changeLangService.changeLang();
  }

  goToEvaluatorsRequest(){
    this.router.navigateByUrl('evaluators/request');
  }
  goToProfile(){
    this.router.navigateByUrl('profile');
  }
}
