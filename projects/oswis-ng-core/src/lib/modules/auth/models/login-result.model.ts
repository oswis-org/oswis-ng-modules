export class LoginResult {
  public loginSuccessful: boolean;
  public errorMessage: string;
  public successMessage: string;

  constructor(
    loginSuccessful: boolean = null,
    errorMessage: string = null,
    successMessage: string = null,
  ) {
    this.loginSuccessful = loginSuccessful;
    this.errorMessage = errorMessage;
    this.successMessage = successMessage;
  }
}
