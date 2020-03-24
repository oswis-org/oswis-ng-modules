import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {OswisNgMaterialModule} from "oswis-ng-material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OswisNgAuthRoutingModule} from "./oswis-ng-auth-routing.module";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ChangePasswordRequestComponent} from "./change-password-request/change-password-request.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {OswisNgAuthComponent} from "./oswis-ng-auth.component";
import {AuthenticationService} from "./services/authentication.service";
import {TokenStorageService} from "./services/token-storage.service";

@NgModule({
  imports: [
    CommonModule,
    OswisNgMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    OswisNgAuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
    OswisNgAuthComponent
  ],
  providers: [
    AuthenticationService,
    TokenStorageService,
  ],
})
export class OswisNgAuthModule {
}
