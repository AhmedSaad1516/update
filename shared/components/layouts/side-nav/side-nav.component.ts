import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HorizontalFooterComponent } from '../horizontal-footer/horizontal-footer.component';
import { HorizontalHeaderComponent } from '../horizontal-header/horizontal-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    HorizontalFooterComponent,
    HorizontalHeaderComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslateModule,
  ],
})
export class SideNavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  goToHome() {
    this.router.navigate(['individuals']);
  }

  goToHome1() {
    this.router.navigate(['home']);
  }

  goToView() {
    this.router.navigate(['view/request']);
  }
}
