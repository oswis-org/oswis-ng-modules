import {AppUserModel} from './app-user.model';
import {AppUserRoleModel} from './app-user-role.model';
import {NameableModel} from "../../../models/nameable.model";

export class AppUserTypeModel extends NameableModel {
  public appUsers: AppUserModel[];
  public appUserRole: AppUserRoleModel;
  public roleName: string;
  public adminUser: boolean;
}
