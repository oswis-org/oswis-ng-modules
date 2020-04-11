import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {OswisSharedModule} from "oswis-shared";
import {OswisAuthComponent} from "./oswis-auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OswisAuthRoutingModule} from "./oswis-auth-routing.module";
import {AppUserLoginComponent} from "./components/app-user-login.component";
import {AppUserLogoutComponent} from "./components/app-user-logout.component";
import {AppUserPasswordChangeComponent} from "./components/app-user-password-change.component";
import {AppUserPasswordChangeRequestComponent} from "./components/app-user-password-change-request.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OswisSharedModule,
    OswisAuthRoutingModule
  ],
  declarations: [
    AppUserLoginComponent,
    AppUserLogoutComponent,
    AppUserPasswordChangeRequestComponent,
    AppUserPasswordChangeComponent,
    OswisAuthComponent
  ],
  providers: [],
})
export class OswisAuthModule {
}
