import {NameableModel} from "../../../models/nameable.model";

export class AppUserRoleModel extends NameableModel {
  public roleName: string;
  public roleString: string;
  public parent: AppUserRoleModel;
}
