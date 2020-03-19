import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {LoginResult} from '../models/login-result.model';
import {NotificationsService} from 'angular2-notifications';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'oswis-auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService,
    private logger: NGXLogger,
  ) {
  }

  ngOnInit() {
    console.log('Calling refresh() from Login.');
    this.authenticationService.refresh()
      .subscribe((response: any) => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate([this.authenticationService.popRedirectUrl()]).then();
        }
      });
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate([this.authenticationService.popRedirectUrl()]).then();
    }
  }

  login() {
    this.loading = true;
    this.error = '';
    const redirectUrl = this.authenticationService.popRedirectUrl();
    this.authenticationService.login(this.model.username, this.model.password, this.model.persistent)
      .then((result: LoginResult) => {
        if (result.loginSuccessful === true) {
          this.notificationService.success(
            'Uživatel přihlášen',
            'Uživatel ' + this.authenticationService.getCurrentUser().username + ' byl úspěšně přihlášen do systému.' + ''
          );
          console.log('Logged in, navigating to ' + redirectUrl + '. Message: ' + result.successMessage);
          this.router.navigate([redirectUrl]).then();
        } else {
          this.notificationService.error(
            'Chyba přihlášení',
            'Byly zadány nesprávné přihlašovací údaje. (' + result.errorMessage + ')'
          );
          this.logger.error(result.errorMessage);
          this.error = result.errorMessage;
          this.loading = false;
        }
      });
  }

  redirectToRecovery() {
    this.authenticationService.redirectToPasswordChangeRequest();
  }

}
