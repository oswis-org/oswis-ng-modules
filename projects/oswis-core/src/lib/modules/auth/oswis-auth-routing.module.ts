import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppUserPasswordChangeComponent} from './components/app-user-password-change.component';
import {AppUserPasswordChangeRequestComponent} from './components/app-user-password-change-request.component';
import {AppUserLogoutComponent} from './components/app-user-logout.component';
import {AppUserLoginComponent} from './components/app-user-login.component';
import {OswisAuthComponent} from './oswis-auth.component';

const authRoutes: Routes = [
  {
    path: '', component: OswisAuthComponent, children: [
      {path: 'logout', component: AppUserLogoutComponent},
      {path: 'password-change-request/:username', component: AppUserPasswordChangeRequestComponent},
      {path: 'password-change-request', component: AppUserPasswordChangeRequestComponent},
      {path: 'password-change/:token', component: AppUserPasswordChangeComponent},
      {path: 'password-change', component: AppUserPasswordChangeComponent},
      {path: 'login', component: AppUserLoginComponent},
      // {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      // {path: '**', redirectTo: ''},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: []
})
export class OswisAuthRoutingModule {
}

