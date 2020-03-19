import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ChangePasswordRequestComponent} from './change-password-request/change-password-request.component';
import {LogoutComponent} from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {OswisNgAuthComponent} from './oswis-ng-auth.component';

const authRoutes: Routes = [
  {
    path: '', component: OswisNgAuthComponent, children: [
      {path: 'logout', component: LogoutComponent},
      {path: 'password-change-request/:username', component: ChangePasswordRequestComponent},
      {path: 'password-change-request', component: ChangePasswordRequestComponent},
      {path: 'password-change/:token', component: ChangePasswordComponent},
      {path: 'password-change', component: ChangePasswordComponent},
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      {path: '**', redirectTo: ''},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: []
})
export class OswisNgAuthRoutingModule {
}

