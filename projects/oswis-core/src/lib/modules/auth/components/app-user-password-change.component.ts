import {Component} from '@angular/core';
import {AppUserActionAbstractComponent} from "./app-user-action.abstract.component";
import {AppUserActionModel} from "oswis-shared";

@Component({
  selector: 'oswis-app-user-password-change',
  templateUrl: './app-user-password-change.component.html',
})
export class AppUserPasswordChangeComponent extends AppUserActionAbstractComponent {
  actionType: string = AppUserActionModel.TYPE_PASSWORD_CHANGE;
}
