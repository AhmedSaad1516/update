
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Route, RouterOutlet,Router } from '@angular/router';
import { ChangeDirService } from './shared/services/change-dir.service';
import { IndividualsPortalComponent } from './features/individuals-portal/individuals-portal.component';
import { HorizontalFooterComponent } from './shared/components/layouts/horizontal-footer/horizontal-footer.component';
import { HorizontalHeaderComponent } from './shared/components/layouts/horizontal-header/horizontal-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HeaderInterceptor } from './core/Interceptor/header.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from './shared/services/spinner.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { CoreAuthModule } from './core-auth/core-auth.module';
@Component({
  selector: 'taqeem-workspace-root',
  standalone: true,
    imports: [
    CommonModule,
    RouterOutlet,
    IndividualsPortalComponent,
    HorizontalFooterComponent,
    HorizontalHeaderComponent,
    TranslateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
     MatIconModule,
     CoreAuthModule
  ],
  providers: [ChangeDirService],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'structure-2';
  isShowHeaderAndFooter = false;
  isChangeLang=true;
  // isShowHeaderAndFooter: boolean = false;
  isLoad: boolean = false;


  constructor(
    public changeLangService: ChangeDirService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private SpinnerService: SpinnerService,
    private cd: ChangeDetectorRef,
    private router: Router
      ) {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        window.scrollTo(0, 0)
      }
    else{
      window.scrollTo(0, 0)
    }
  });
  }
  ngOnInit() {
    this.changeLangService.setDefultLang();
    if (isPlatformBrowser(this.platformId)) {
      this.SpinnerService.isLoading.subscribe((state: boolean) => {
        this.isLoad = state;
        console.log(this.isLoad);

        // this.cd.detectChanges();
      });
    }
  }
  isCheckedUrl() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined') {
        const url = window.location.href;
        if (url.includes('auth')) {
          this.isShowHeaderAndFooter = false;
        } else {
          this.isShowHeaderAndFooter = true;
        }
      } else {
        this.isShowHeaderAndFooter = true;
      }
    }
    return this.isShowHeaderAndFooter;
  }
}
