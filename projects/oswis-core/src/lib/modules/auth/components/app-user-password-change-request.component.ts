import {Component} from '@angular/core';
import {AppUserActionAbstractComponent} from "./app-user-action.abstract.component";
import {AppUserActionModel} from "@oswis-org/oswis-shared";

@Component({
  selector: 'oswis-app-user-password-change-request',
  templateUrl: './app-user-password-change-request.component.html',
})
export class AppUserPasswordChangeRequestComponent extends AppUserActionAbstractComponent {
  actionType: string = AppUserActionModel.TYPE_PASSWORD_CHANGE_REQUEST;
}

