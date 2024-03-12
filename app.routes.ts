import { Routes } from '@angular/router';
import { IndividualsPortalComponent } from './features/individuals-portal/individuals-portal.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EvaluatorsPortalComponent } from './features/evaluators-portal/evaluators-portal.component';
import { EvaluatorsPortalRequestComponent } from './features/evaluators-portal/evaluators-portal-request/evaluators-portal-request.component';
import { DetailsAddEvaluationRequestRealestateComponent } from './features/individuals-portal/screens/add-evaluation-request-realestate/details-add-evaluation-request-realestate/details-add-evaluation-request-realestate.component';
// import { HomeComponent } from './features/individuals-portal/screens/home/home.component';
import { OverviewEvaluationRequestComponent } from './features/individuals-portal/screens/overview-evaluation-request/overview-evaluation-request.component';
import { ViewEvaluationRequestRealestateComponent } from './features/individuals-portal/screens/view-evaluation-request-realestate/view-evaluation-request-realestate.component';
import { ProfileComponent } from './features/profile/profile.component';
import { EditProfileComponent } from './features/profile/edit-profile/edit-profile.component';
import { EditPersonalInfoComponent } from './features/profile/edit-personal-info/edit-personal-info.component';
import { loginGuard } from './core/guards/login.guard';
import { homeGuard } from './core/guards/home.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // {
  //   path: 'auth/login',
  //   loadComponent: () =>
  //     import('./features/auth/Components/signin/signin.component').then(
  //       (m) => m.SigninComponent
  //     ),
  //   canActivate:[AuthGuard]
  // },
  {
    path: 'auth/login',
    loadComponent: () =>
      import(
        './features/auth/Components/signin/signin.component'
      ).then((m) => m.SigninComponent),
      canActivate:[loginGuard]
  },
  {
    path: 'auth/login/nfaz',
    loadComponent: () =>
      import(
        './features/auth/Components/login-via-nfaz/login-via-nfaz.component'
      ).then((m) => m.LoginViaNfazComponent),
      canActivate:[AuthGuard]
  },

  // {
  //   path: 'signup',
  //   loadComponent: () =>
  //     import('./features/auth/Components/signup/signup.component').then(
  //       (m) => m.SignupComponent
  //     ),
  // },
  {
    path: 'auth/signup/suadi-citizen',
    loadComponent: () =>
      import(
        './features/auth/Components/suadi-signup/suadi-signup.component'
      ).then((m) => m.SuadiSignupComponent),
      canActivate:[AuthGuard]
  },
  {
    path: 'auth/signup/verfication-code',
    loadComponent: () =>
      import(
        './features/auth/Components/verfication-code/verfication-code.component'
      ).then((m) => m.VerficationCodeComponent),
  },
  {
    path: 'auth/signup/recover-info/personal-info',
    loadComponent: () =>
      import(
        './features/auth/Components/recover-info-stepper/personal-info/personal-info.component'
      ).then((m) => m.PersonalInfoComponent),
      canActivate:[AuthGuard]
  },
  {
    path: 'auth/signup/recover-info/national-address',
    loadComponent: () =>
      import(
        './features/auth/Components/recover-info-stepper/national-address/national-address.component'
      ).then((m) => m.NationalAddressComponent),
  },
  {
    path: 'auth/signup/personal-info',
    loadComponent: () =>
      import(
        './features/auth/Components/non-suadi-signup/personal-info/personal-info.component'
      ).then((m) => m.PersonalInfoComponent),
      canActivate:[AuthGuard]
  },
  {
    path: 'auth/signup/national-address',
    loadComponent: () =>
      import(
        './features/auth/Components/non-suadi-signup/national-address/national-address.component'
      ).then((m) => m.NationalAddressComponent),
  },

  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import(
        './features/auth/Components/reset-password/reset-password.component'
      ).then((m) => m.ResetPasswordComponent),
  },
  {
    path: 'auth/change-password',
    loadComponent: () =>
      import(
        './features/auth/Components/change-password/change-password.component'
      ).then((m) => m.ChangePasswordComponent),
  },
  {
    path: 'individuals',
    component: IndividualsPortalComponent,
    canActivate:[homeGuard]
  },

  {
    path: 'home',
    loadComponent: () =>
    import(
      './features/individuals-portal/screens/home/home.component'
    ).then((m) => m.HomeComponent),
    canActivate:[homeGuard]
  },
  {
    path: 'auth/user-type',
    loadComponent: () =>
      import(
        './features/auth/Components/select-type/select-type.component'
      ).then((m) => m.SelectTypeComponent),
    },

    {
    path: 'individuals',
    component: IndividualsPortalComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'evaluators',
    component: EvaluatorsPortalComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'evaluators/request',
    component: EvaluatorsPortalRequestComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'profile/editPersonalInfo',
    component: EditPersonalInfoComponent,
    canActivate:[homeGuard]
  },

  {
    path: 'details',
    component: DetailsAddEvaluationRequestRealestateComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'view/request',
    component: ViewEvaluationRequestRealestateComponent,
    canActivate:[homeGuard]
  },
  {
    path: 'overview',
    component: OverviewEvaluationRequestComponent,
    canActivate:[homeGuard]
  },
];
