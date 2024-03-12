import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { provideQuillConfig } from 'ngx-quill/config';
import { routes } from './app.routes';
import { httpInterceptor } from './core/Interceptor/http.interceptor';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { LookupEffects } from './features/individuals-portal/screens/lookup-state/lookup.effects';
import { ValuationRequestRealestateEffects } from './features/individuals-portal/screens/state/valuation-request-realestate.effects';
import { appReducer } from './features/individuals-portal/store/app.state';

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: rootLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    provideStore(appReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([LookupEffects, ValuationRequestRealestateEffects]),
    // provideQuillConfig({
    //   modules: {
    //     syntax: false,
    //     table: false,
    //   },
    // }),

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HeaderInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HeaderInterceptor,
    //   multi: true,
    // },
  ],
};
