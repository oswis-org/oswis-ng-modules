export class AppUserActionModel {
  public static TYPE_PASSWORD_CHANGE = 'password-change';
  public static TYPE_PASSWORD_CHANGE_REQUEST = 'password-change-request';
  public static TYPE_ACTIVATION = 'activation';
  public static TYPE_ACTIVATION_REQUEST = 'activation-request';

  public static ALLOWED_TYPES = [
    AppUserActionModel.TYPE_PASSWORD_CHANGE,
    AppUserActionModel.TYPE_PASSWORD_CHANGE_REQUEST,
    AppUserActionModel.TYPE_ACTIVATION,
    AppUserActionModel.TYPE_ACTIVATION_REQUEST,
  ];

  public username: string;
  public token: string;
  public password: string;
  public uid: number;
  public type: string;
}
