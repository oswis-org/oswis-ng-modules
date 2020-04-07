import {NameableModel} from "./nameable.model";

export class AppUserRoleModel extends NameableModel {
  public roleName: string;
  public roleString: string;
  public parent: AppUserRoleModel;
}
